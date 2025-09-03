import React from 'react'
import { LanguageSelector } from './LanguageSelector'
import { Shield, Menu, Settings } from 'lucide-react'

export function AppShell({ children, user, language, onLanguageChange, currentView }) {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="relative z-10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Zara Rights</h1>
                <p className="text-sm text-white/80">Your instant legal guide</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageSelector
                language={language}
                onLanguageChange={onLanguageChange}
              />
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 pb-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}