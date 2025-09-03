import React from 'react'
import { ContentCard } from './ContentCard'
import { CallToActionButton } from './CallToActionButton'
import { Mic, FileText, AlertTriangle, Users } from 'lucide-react'

export function Dashboard({ scenarios, language, onScenarioSelect, onStartRecording }) {
  const getText = (key) => {
    const texts = {
      en: {
        welcomeTitle: 'Know Your Rights',
        welcomeSubtitle: 'Quick access to legal guidance when you need it most',
        commonScenarios: 'Common Scenarios',
        quickActions: 'Quick Actions',
        emergencyRecord: 'Emergency Record',
        emergencyRecordDesc: 'Start recording immediately',
        generateCard: 'Generate Rights Card',
        generateCardDesc: 'Create shareable summary',
        viewAll: 'View All Scenarios'
      },
      es: {
        welcomeTitle: 'Conoce Tus Derechos',
        welcomeSubtitle: 'Acceso rápido a orientación legal cuando más lo necesitas',
        commonScenarios: 'Escenarios Comunes',
        quickActions: 'Acciones Rápidas',
        emergencyRecord: 'Grabación de Emergencia',
        emergencyRecordDesc: 'Comenzar a grabar inmediatamente',
        generateCard: 'Generar Tarjeta de Derechos',
        generateCardDesc: 'Crear resumen compartible',
        viewAll: 'Ver Todos los Escenarios'
      }
    }
    return texts[language]?.[key] || texts.en[key]
  }

  const featuredScenarios = scenarios.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center text-white mb-8">
        <h2 className="text-3xl font-bold mb-2">{getText('welcomeTitle')}</h2>
        <p className="text-lg text-white/80">{getText('welcomeSubtitle')}</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">{getText('quickActions')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CallToActionButton
            variant="alert"
            icon={<Mic className="w-5 h-5" />}
            title={getText('emergencyRecord')}
            description={getText('emergencyRecordDesc')}
            onClick={onStartRecording}
          />
          <CallToActionButton
            variant="secondary"
            icon={<FileText className="w-5 h-5" />}
            title={getText('generateCard')}
            description={getText('generateCardDesc')}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Featured Scenarios */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">{getText('commonScenarios')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {featuredScenarios.map((scenario) => (
            <ContentCard
              key={scenario.scenarioId}
              variant="scenario"
              scenario={scenario}
              language={language}
              onClick={() => onScenarioSelect(scenario)}
            />
          ))}
        </div>
        
        <div className="text-center">
          <CallToActionButton
            variant="secondary"
            title={getText('viewAll')}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        <div className="glass-effect rounded-lg p-4 text-center text-white">
          <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-sm text-white/80">Users Protected</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center text-white">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold">24/7</div>
          <div className="text-sm text-white/80">Available</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center text-white col-span-2 sm:col-span-1">
          <FileText className="w-6 h-6 mx-auto mb-2 text-accent" />
          <div className="text-2xl font-bold">15+</div>
          <div className="text-sm text-white/80">Scenarios</div>
        </div>
      </div>
    </div>
  )
}