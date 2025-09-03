import React from 'react'

export function CallToActionButton({ variant, icon, title, description, onClick, className = '' }) {
  const baseClasses = "w-full rounded-lg p-4 text-left transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-blue-600",
    secondary: "bg-white text-text-primary hover:bg-gray-50 shadow-card",
    alert: "bg-error text-white hover:bg-red-600"
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-center space-x-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1">
          <div className="font-semibold">{title}</div>
          {description && (
            <div className={`text-sm mt-1 ${
              variant === 'secondary' ? 'text-text-secondary' : 'opacity-80'
            }`}>
              {description}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}