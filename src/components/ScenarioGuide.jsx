import React, { useState } from 'react'
import { ArrowLeft, Mic, Share2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { CallToActionButton } from './CallToActionButton'

export function ScenarioGuide({ scenario, language, onStartRecording, onGenerateCard, onBack }) {
  const [activeTab, setActiveTab] = useState('rights')

  const getText = (key) => {
    const texts = {
      en: {
        yourRights: 'Your Rights',
        whatToSay: 'What to Say',
        dosDonts: 'Do\'s & Don\'ts',
        startRecording: 'Start Recording',
        generateCard: 'Generate Shareable Card',
        keyRights: 'Key Rights',
        suggestedPhrases: 'Suggested Phrases',
        importantDos: 'Important Do\'s',
        criticalDonts: 'Critical Don\'ts'
      },
      es: {
        yourRights: 'Tus Derechos',
        whatToSay: 'Qué Decir',
        dosDonts: 'Qué Hacer y No Hacer',
        startRecording: 'Comenzar Grabación',
        generateCard: 'Generar Tarjeta Compartible',
        keyRights: 'Derechos Clave',
        suggestedPhrases: 'Frases Sugeridas',
        importantDos: 'Cosas Importantes que Hacer',
        criticalDonts: 'Cosas Críticas que NO Hacer'
      }
    }
    return texts[language]?.[key] || texts.en[key]
  }

  const getScenarioContent = () => {
    const content = scenario.content[language] || scenario.content.en
    const title = scenario.title[language] || scenario.title.en
    
    return {
      title,
      rights: content.rights || [
        "You have the right to remain silent",
        "You have the right to refuse searches without a warrant",
        "You have the right to ask 'Am I free to leave?'",
        "You have the right to an attorney"
      ],
      phrases: content.phrases || [
        "I am exercising my right to remain silent",
        "I do not consent to any searches",
        "Am I free to leave?",
        "I want to speak to a lawyer"
      ],
      dos: content.dos || [
        "Stay calm and respectful",
        "Keep your hands visible",
        "Follow lawful orders",
        "Remember badge numbers and details"
      ],
      donts: content.donts || [
        "Don't argue or resist",
        "Don't volunteer information",
        "Don't consent to searches",
        "Don't make sudden movements"
      ]
    }
  }

  const content = getScenarioContent()

  const tabs = [
    { id: 'rights', label: getText('yourRights'), icon: CheckCircle },
    { id: 'phrases', label: getText('whatToSay'), icon: Mic },
    { id: 'dosdont', label: getText('dosDonts'), icon: AlertTriangle }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rights':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary">{getText('keyRights')}</h4>
            <div className="space-y-3">
              {content.rights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">{right}</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'phrases':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-text-primary">{getText('suggestedPhrases')}</h4>
            <div className="space-y-3">
              {content.phrases.map((phrase, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium text-primary">"{phrase}"</p>
                </div>
              ))}
            </div>
          </div>
        )
      
      case 'dosdont':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3">{getText('importantDos')}</h4>
              <div className="space-y-2">
                {content.dos.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-3">{getText('criticalDonts')}</h4>
              <div className="space-y-2">
                {content.donts.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-white">{content.title}</h2>
          <p className="text-white/80 text-sm">Legal guidance for this scenario</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CallToActionButton
          variant="alert"
          icon={<Mic className="w-5 h-5" />}
          title={getText('startRecording')}
          onClick={onStartRecording}
        />
        <CallToActionButton
          variant="secondary"
          icon={<Share2 className="w-5 h-5" />}
          title={getText('generateCard')}
          onClick={() => onGenerateCard({ scenario, type: 'manual' })}
        />
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-blue-50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}