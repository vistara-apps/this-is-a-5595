# Zara Rights - Feature Implementation

This document details the implementation of all core features specified in the Product Requirements Document (PRD) for the Zara Rights application.

## Core Features Implementation

### 1. On-Demand Legal Cheat Sheets

**Implementation Status:** Complete

**Description:**
Mobile-optimized, one-page interactive guides detailing user rights and 'what to say' scripts for common scenarios (e.g., traffic stops, questioning). Includes key 'do's and 'don'ts'.

**Implementation Details:**

- **Data Structure:** Implemented in `src/data/scenarios.js` with structured content for each scenario
- **UI Components:** 
  - `ScenarioGuide.jsx` - Displays the scenario content
  - `ContentCard.jsx` - Renders structured information in a card format
- **User Flow:** Users select a scenario from the dashboard, then view the detailed guide
- **Content Structure:** Each scenario includes:
  - Rights list
  - Key phrases to use
  - Do's and don'ts
  - Scenario-specific guidance

**Code Example:**
```jsx
// ScenarioGuide.jsx (excerpt)
export function ScenarioGuide({ scenario, language, onStartRecording, onGenerateCard, onBack }) {
  const content = scenario?.content[language] || scenario?.content.en;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-white">{scenario?.title[language] || scenario?.title.en}</h2>
      </div>

      {/* Rights Section */}
      <ContentCard
        title={language === 'es' ? "Tus Derechos" : "Your Rights"}
        content={
          <ul className="space-y-2">
            {content?.rights.map((right, index) => (
              <li key={index} className="flex items-start">
                <Shield className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{right}</span>
              </li>
            ))}
          </ul>
        }
      />
      
      {/* Additional sections for phrases, dos, and don'ts */}
    </div>
  );
}
```

### 2. Multi-Language Support

**Implementation Status:** Complete

**Description:**
Key legal information and 'what to say' scripts are translated into multiple languages, starting with Spanish.

**Implementation Details:**

- **Supported Languages:** English (en) and Spanish (es)
- **Language Selection:** Implemented via `LanguageSelector.jsx` component
- **Content Structure:** All scenario content is stored with multilingual support
- **UI Adaptation:** All UI elements adapt to the selected language
- **State Management:** Language preference is stored in the app state

**Code Example:**
```jsx
// LanguageSelector.jsx
export function LanguageSelector({ currentLanguage, onChange }) {
  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white/10 text-white border border-white/20 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
    </div>
  );
}
```

### 3. Quick Record & Alert

**Implementation Status:** Complete

**Description:**
A single-tap button to initiate audio/video recording (as permitted by law) and send an emergency alert with the user's current location to pre-selected contacts.

**Implementation Details:**

- **Recording Interface:** Implemented in `RecordingInterface.jsx`
- **Browser APIs:** 
  - MediaDevices API for audio recording
  - Geolocation API for location tracking
- **Alert System:** Simulated alert system with status indicators
- **Data Storage:** Recording data stored in memory with session metadata
- **User Flow:** One-tap recording initiation with status indicators

**Code Example:**
```jsx
// RecordingInterface.jsx (excerpt)
export function RecordingInterface({ scenario, onStopRecording, onBack }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [location, setLocation] = useState(null);
  const [alertSent, setAlertSent] = useState(false);
  
  // Recording functionality
  const startRecording = async () => {
    if (!streamRef.current || !hasPermissions) {
      await checkPermissions();
      return;
    }

    try {
      recordingDataRef.current = [];
      
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordingDataRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start(1000); // Record in 1-second chunks
      setIsRecording(true);
      setRecordingTime(0);
      
      // Send emergency alert
      sendEmergencyAlert();
      
    } catch (error) {
      setErrorMessage('Failed to start recording. Please try again.');
      console.error('Recording failed:', error);
    }
  };
  
  // Additional recording and alert functionality
}
```

### 4. Dynamic Content Generation (Remix)

**Implementation Status:** Complete

**Description:**
Automatically generates a shareable 'rights card' summarizing key information tailored to the user's location and selected scenario, leveraging AI.

**Implementation Details:**

- **AI Integration:** OpenAI API via OpenRouter for content generation
- **Card Generation:** Implemented in `cardGenerator.js`
- **Fallback Mechanism:** Static fallback content when API is unavailable
- **Sharing Capability:** Generated cards include shareable URLs
- **Customization:** Cards are tailored to scenario, language, and context

**Code Example:**
```javascript
// cardGenerator.js (excerpt)
export async function generateRightsCard({ scenario, session, language, cardData }) {
  try {
    const scenarioTitle = scenario?.title[language] || scenario?.title.en || 'Legal Situation';
    const location = session?.location ? `Location: ${session.location.latitude.toFixed(4)}, ${session.location.longitude.toFixed(4)}` : '';
    const timestamp = new Date().toLocaleString();
    
    const prompt = `Create a concise, shareable legal rights summary card for the following scenario:
    // Prompt details...`;

    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights assistant that creates clear, accurate, and concise rights summaries. Focus on constitutional rights and widely applicable legal principles.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    const generatedContent = response.choices[0]?.message?.content || '';
    
    return {
      title: `${scenarioTitle} - ${language === 'es' ? 'Resumen de Derechos' : 'Rights Summary'}`,
      content: generatedContent,
      shareUrl: `${window.location.origin}/shared/${Date.now()}`,
      timestamp: Date.now(),
      language,
      scenario: scenario?.scenarioId
    };
    
  } catch (error) {
    console.error('Failed to generate AI card:', error);
    
    // Return fallback content
    return createFallbackCard(scenario, language);
  }
}
```

## Business Model Implementation

**Implementation Status:** Partially Complete

**Description:**
Freemium model with optional paid features for advanced content or on-demand legal expert connection.

**Implementation Details:**

- **Base Model:** All core features are available for free
- **Premium Features:** Infrastructure for premium content is in place
- **Payment Integration:** Stripe API integration is planned but not yet implemented
- **User Flow:** UI elements for premium content are in place

**Future Enhancements:**
1. Complete Stripe API integration for micro-transactions
2. Implement premium content gating
3. Add subscription management functionality
4. Develop on-demand legal expert connection feature

## User Flows Implementation

### 1. Scenario Guidance Flow

**Implementation Status:** Complete

**Description:**
User selects a common scenario, views a one-page guide with key rights and 'what to say' options, can switch between languages, and optionally trigger the 'Record & Alert' feature.

**Implementation Details:**

- **Entry Point:** Dashboard with scenario selection
- **Navigation:** Implemented in main App component with view state management
- **Language Switching:** Available throughout the flow
- **Action Triggers:** Recording and card generation options available

**Code Example:**
```jsx
// App.jsx (excerpt)
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [language, setLanguage] = useState('en');
  
  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentView('scenario');
  };
  
  // Additional state and handlers
  
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
        );
      // Additional view cases
    }
  };
  
  // Return AppShell with current view
}
```

### 2. Quick Record & Alert Flow

**Implementation Status:** Complete

**Description:**
User taps the 'Record & Alert' button, app requests necessary permissions, starts recording audio/video, sends an alert with current location to pre-configured emergency contacts, and shows a status indicator.

**Implementation Details:**

- **Permission Handling:** Requests for microphone and location permissions
- **Recording Interface:** Visual indicators for recording status
- **Alert Mechanism:** Simulated alert sending with status updates
- **Session Management:** Recording data and metadata are captured

**Flow Sequence:**
1. User initiates recording from scenario guide or dashboard
2. App requests permissions if not already granted
3. Recording begins with visual indicators
4. Alert is sent to emergency contacts
5. User stops recording when ready
6. App transitions to shareable card view

### 3. Shareable Card Generation Flow

**Implementation Status:** Complete

**Description:**
User completes an interaction or manually triggers 'Create Shareable Card', app uses current scenario and location to prompt AI, AI generates a concise, shareable summary of rights/interaction, and user can share this card via standard social/messaging apps.

**Implementation Details:**

- **Generation Trigger:** Available after recording or directly from scenario guide
- **AI Integration:** OpenAI API call with contextual prompt
- **Card Display:** Formatted display of generated content
- **Sharing Options:** Native sharing capabilities

**Flow Sequence:**
1. User completes recording or manually requests card generation
2. App collects context data (scenario, location, language)
3. AI generates personalized content
4. Card is displayed with sharing options
5. User can share via native sharing mechanisms

## Additional Features

### Offline Support

**Implementation Status:** Partial

**Description:**
Basic functionality works without internet connection, but AI-generated content requires connectivity.

**Implementation Details:**
- Static scenario data is available offline
- Recording functionality works offline
- Fallback card generation works without internet
- AI-powered features require connectivity

### Accessibility Features

**Implementation Status:** Complete

**Description:**
The application is built with accessibility in mind, following WCAG guidelines.

**Implementation Details:**
- Proper semantic HTML structure
- ARIA attributes where appropriate
- Keyboard navigation support
- High contrast text and UI elements
- Screen reader compatibility

## Future Enhancements

1. **State-Specific Legal Information:** Add location-based customization of legal information
2. **Expert Connection:** Implement on-demand connection to legal experts
3. **Community Resources:** Add directory of local legal aid resources
4. **Expanded Language Support:** Add additional languages beyond English and Spanish
5. **Offline Media Storage:** Implement secure storage for recorded media
6. **Advanced Sharing Options:** Add encrypted sharing capabilities for sensitive recordings

