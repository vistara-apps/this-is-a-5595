import React from 'react'
import { Mic, MicOff } from 'lucide-react'

export function RecordingStatusIndicator({ variant }) {
  if (variant === 'recording') {
    return (
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute w-24 h-24 bg-error rounded-full animate-pulse-ring"></div>
        <div className="absolute w-20 h-20 bg-error rounded-full animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Center microphone */}
        <div className="relative w-16 h-16 bg-error rounded-full flex items-center justify-center">
          <Mic className="w-8 h-8 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
      <MicOff className="w-8 h-8 text-gray-400" />
    </div>
  )
}