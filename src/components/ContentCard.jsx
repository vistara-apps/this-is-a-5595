import React from 'react'
import { ChevronRight, Clock, MapPin } from 'lucide-react'

export function ContentCard({ variant, scenario, language, onClick }) {
  const getScenarioText = (scenario, language) => {
    return {
      title: scenario.title[language] || scenario.title.en,
      content: scenario.content[language] || scenario.content.en
    }
  }

  if (variant === 'scenario') {
    const text = getScenarioText(scenario, language)
    
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-lg shadow-card p-6 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-text-primary mb-1">{text.title}</h4>
            <p className="text-sm text-text-secondary line-clamp-2">{text.content.substring(0, 80)}...</p>
          </div>
          <ChevronRight className="w-5 h-5 text-text-secondary flex-shrink-0 ml-2" />
        </div>
        
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>2 min read</span>
          </div>
          {scenario.stateSpecific && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>State specific</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'guideSummary') {
    return (
      <div className="bg-white rounded-lg shadow-card p-6">
        <h4 className="font-semibold text-text-primary mb-3">Your Rights Summary</h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• You have the right to remain silent</p>
          <p>• You have the right to refuse searches</p>
          <p>• You have the right to ask if you're free to leave</p>
          <p>• You have the right to an attorney</p>
        </div>
      </div>
    )
  }

  return <div>Unknown card variant</div>
}