import React, { useState, useEffect } from 'react'
import { AppShell } from './components/AppShell'
import { Dashboard } from './components/Dashboard'
import { ScenarioGuide } from './components/ScenarioGuide'
import { RecordingInterface } from './components/RecordingInterface'
import { ShareableCard } from './components/ShareableCard'
import { scenarioData } from './data/scenarios'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [language, setLanguage] = useState('en')
  const [user, setUser] = useState({
    userId: 'user-1',
    preferredLanguage: 'en',
    emergencyContacts: [],
    analyticsOptIn: true
  })
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSession, setRecordingSession] = useState(null)
  const [generatedCard, setGeneratedCard] = useState(null)

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario)
    setCurrentView('scenario')
  }

  const handleStartRecording = () => {
    setCurrentView('recording')
    setIsRecording(true)
  }

  const handleStopRecording = (session) => {
    setRecordingSession(session)
    setIsRecording(false)
    setCurrentView('card')
  }

  const handleGenerateCard = (cardData) => {
    setGeneratedCard(cardData)
    setCurrentView('card')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedScenario(null)
    setRecordingSession(null)
    setGeneratedCard(null)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'scenario':
        return (
          <ScenarioGuide
            scenario={selectedScenario}
            language={language}
            onStartRecording={handleStartRecording}
            onGenerateCard={handleGenerateCard}
            onBack={handleBackToDashboard}
          />
        )
      case 'recording':
        return (
          <RecordingInterface
            scenario={selectedScenario}
            onStopRecording={handleStopRecording}
            onBack={handleBackToDashboard}
          />
        )
      case 'card':
        return (
          <ShareableCard
            scenario={selectedScenario}
            session={recordingSession}
            cardData={generatedCard}
            language={language}
            onBack={handleBackToDashboard}
          />
        )
      default:
        return (
          <Dashboard
            scenarios={scenarioData}
            language={language}
            onScenarioSelect={handleScenarioSelect}
            onStartRecording={handleStartRecording}
          />
        )
    }
  }

  return (
    <AppShell
      user={user}
      language={language}
      onLanguageChange={setLanguage}
      currentView={currentView}
    >
      {renderCurrentView()}
    </AppShell>
  )
}

export default App