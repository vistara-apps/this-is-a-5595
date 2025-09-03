import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Mic, Square, MapPin, Clock, Users } from 'lucide-react'
import { CallToActionButton } from './CallToActionButton'
import { RecordingStatusIndicator } from './RecordingStatusIndicator'

export function RecordingInterface({ scenario, onStopRecording, onBack }) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [hasPermissions, setHasPermissions] = useState(false)
  const [location, setLocation] = useState(null)
  const [alertSent, setAlertSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const recordingDataRef = useRef([])

  useEffect(() => {
    checkPermissions()
    getCurrentLocation()
    
    return () => {
      stopRecording()
    }
  }, [])

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const checkPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      })
      streamRef.current = stream
      setHasPermissions(true)
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Microphone access required for recording. Please enable permissions.')
      console.error('Permission denied:', error)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now()
          })
        },
        (error) => {
          console.error('Location access denied:', error)
        }
      )
    }
  }

  const startRecording = async () => {
    if (!streamRef.current || !hasPermissions) {
      await checkPermissions()
      return
    }

    try {
      recordingDataRef.current = []
      
      mediaRecorderRef.current = new MediaRecorder(streamRef.current)
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingDataRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.start(1000) // Record in 1-second chunks
      setIsRecording(true)
      setRecordingTime(0)
      
      // Send emergency alert
      sendEmergencyAlert()
      
    } catch (error) {
      setErrorMessage('Failed to start recording. Please try again.')
      console.error('Recording failed:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Create session data
      const session = {
        sessionId: `session-${Date.now()}`,
        userId: 'user-1',
        scenarioId: scenario?.scenarioId || 'emergency',
        startTime: Date.now() - (recordingTime * 1000),
        endTime: Date.now(),
        recordingData: recordingDataRef.current,
        alertSent,
        location
      }

      onStopRecording(session)
    }

    // Clean up media stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
  }

  const sendEmergencyAlert = async () => {
    try {
      // Simulate sending alert to emergency contacts
      // In a real app, this would send SMS/email to pre-configured contacts
      setTimeout(() => {
        setAlertSent(true)
      }, 2000)
    } catch (error) {
      console.error('Failed to send emergency alert:', error)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
          disabled={isRecording}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">Emergency Recording</h2>
          <p className="text-white/80 text-sm">
            {scenario ? `Recording for: ${scenario.title.en}` : 'General emergency recording'}
          </p>
        </div>
      </div>

      {/* Recording Status */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="text-center space-y-4">
          <RecordingStatusIndicator variant={isRecording ? 'recording' : 'idle'} />
          
          {isRecording && (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-error">{formatTime(recordingTime)}</div>
              <p className="text-sm text-text-secondary">Recording in progress...</p>
            </div>
          )}
          
          {!isRecording && hasPermissions && (
            <div className="space-y-2">
              <p className="text-text-primary font-medium">Ready to record</p>
              <p className="text-sm text-text-secondary">Tap the button below to start</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </div>
      )}

      {/* Status Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center">
          <Clock className={`w-6 h-6 mx-auto mb-2 ${isRecording ? 'text-error' : 'text-text-secondary'}`} />
          <div className="text-sm font-medium">
            {isRecording ? formatTime(recordingTime) : 'Not recording'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <MapPin className={`w-6 h-6 mx-auto mb-2 ${location ? 'text-accent' : 'text-text-secondary'}`} />
          <div className="text-sm font-medium">
            {location ? 'Location tracked' : 'No location'}
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center">
          <Users className={`w-6 h-6 mx-auto mb-2 ${alertSent ? 'text-accent' : 'text-text-secondary'}`} />
          <div className="text-sm font-medium">
            {alertSent ? 'Alert sent' : 'No alert'}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-4">
        {!isRecording ? (
          <CallToActionButton
            variant="alert"
            icon={<Mic className="w-6 h-6" />}
            title="Start Emergency Recording"
            description="Begin recording and send alert to contacts"
            onClick={startRecording}
            className="text-lg py-6"
          />
        ) : (
          <CallToActionButton
            variant="primary"
            icon={<Square className="w-6 h-6" />}
            title="Stop Recording"
            description={`Recording for ${formatTime(recordingTime)}`}
            onClick={stopRecording}
            className="text-lg py-6"
          />
        )}
      </div>

      {/* Legal Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Legal Notice:</strong> Recording laws vary by location. This app attempts to comply with one-party consent laws, but you are responsible for understanding and following local recording regulations.
        </p>
      </div>
    </div>
  )
}