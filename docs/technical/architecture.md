# Zara Rights - Technical Architecture

This document outlines the technical architecture of the Zara Rights application, including its structure, components, data flow, and technical decisions.

## System Overview

Zara Rights is a client-side web application built with React and Vite that provides legal rights information and tools for individuals interacting with law enforcement. The application is designed to be mobile-first, with a focus on accessibility and offline capabilities.

## Technology Stack

### Frontend Framework

- **React**: JavaScript library for building user interfaces
- **Vite**: Build tool and development server

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing tool
- **Autoprefixer**: Vendor prefix automation

### External APIs

- **OpenAI API** (via OpenRouter): For generating dynamic content
- **Browser APIs**:
  - MediaDevices API: For audio recording
  - Geolocation API: For location tracking
  - Web Share API: For sharing content

### Future Integrations

- **Stripe API**: For payment processing (planned)

## Application Architecture

### Component Structure

The application follows a component-based architecture with the following main components:

```
src/
├── components/
│   ├── AppShell.jsx           # Main layout wrapper
│   ├── CallToActionButton.jsx # Reusable action button
│   ├── ContentCard.jsx        # Card component for content display
│   ├── Dashboard.jsx          # Home screen with scenario selection
│   ├── LanguageSelector.jsx   # Language switching component
│   ├── RecordingInterface.jsx # Recording functionality UI
│   ├── RecordingStatusIndicator.jsx # Visual indicator for recording
│   ├── ScenarioGuide.jsx      # Detailed scenario information
│   └── ShareableCard.jsx      # Generated shareable content
├── data/
│   └── scenarios.js           # Scenario data with multilingual content
├── services/
│   └── cardGenerator.js       # AI-powered card generation service
├── App.jsx                    # Main application component
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

### State Management

The application uses React's built-in state management with `useState` and `useEffect` hooks. The main state is managed in the App component and passed down to child components via props.

Key state elements include:

- **User State**: User preferences and settings
- **View State**: Current application view (dashboard, scenario, recording, card)
- **Scenario State**: Currently selected scenario
- **Language State**: Current language selection
- **Recording State**: Recording status and session data

### Data Flow

1. **User Interaction**: User selects a scenario or initiates recording
2. **State Updates**: App component updates state based on user actions
3. **View Rendering**: Current view is rendered based on state
4. **API Interactions**: External APIs are called as needed (e.g., for card generation)
5. **Data Presentation**: Results are presented to the user

## Key Technical Implementations

### Multilingual Support

The application implements multilingual support through:

1. **Structured Content**: All content is stored with language variants
2. **Language Selection**: User can switch between languages
3. **UI Adaptation**: Components render content based on selected language

```javascript
// Example of multilingual content structure
{
  title: {
    en: 'Traffic Stop',
    es: 'Parada de Tráfico'
  },
  content: {
    en: {
      rights: [...],
      phrases: [...],
      // Additional content
    },
    es: {
      rights: [...],
      phrases: [...],
      // Additional content
    }
  }
}
```

### Recording Functionality

The recording functionality is implemented using the MediaDevices API:

1. **Permission Handling**: Request microphone access
2. **MediaRecorder**: Create and manage recording sessions
3. **Data Collection**: Collect audio data in chunks
4. **Session Management**: Track recording metadata

```javascript
// Example of recording implementation
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
```

### AI-Powered Content Generation

The application uses OpenAI's API through OpenRouter to generate dynamic content:

1. **Context Collection**: Gather scenario, language, and session data
2. **Prompt Construction**: Create a detailed prompt for the AI
3. **API Call**: Send request to OpenAI API
4. **Response Processing**: Format and display the generated content
5. **Fallback Mechanism**: Provide static content if API call fails

```javascript
// Example of AI content generation
export async function generateRightsCard({ scenario, session, language, cardData }) {
  try {
    // Prepare context data
    const scenarioTitle = scenario?.title[language] || scenario?.title.en || 'Legal Situation';
    const location = session?.location ? `Location: ${session.location.latitude.toFixed(4)}, ${session.location.longitude.toFixed(4)}` : '';
    const timestamp = new Date().toLocaleString();
    
    // Construct prompt
    const prompt = `Create a concise, shareable legal rights summary card for the following scenario:
    // Prompt details...`;

    // Make API call
    const response = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights assistant...'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });

    // Process response
    const generatedContent = response.choices[0]?.message?.content || '';
    
    // Return formatted card data
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

## Security Considerations

### API Key Protection

The application uses environment variables to store API keys:

```javascript
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});
```

**Note**: In a production environment, API calls should be proxied through a server to protect API keys.

### Sensitive Data Handling

The application handles sensitive data with care:

1. **Recording Data**: Stored only in memory, not persisted
2. **Location Data**: Only accessed with user permission
3. **User Data**: Minimal data collection, stored locally

### Permission Management

The application implements proper permission handling:

1. **Explicit Requests**: Clear permission requests with purpose
2. **Graceful Degradation**: Functions without permissions when possible
3. **Status Indicators**: Clear indication of permission status

## Performance Optimization

### Lazy Loading

Components are rendered conditionally based on the current view:

```javascript
const renderCurrentView = () => {
  switch (currentView) {
    case 'scenario':
      return <ScenarioGuide {...props} />;
    case 'recording':
      return <RecordingInterface {...props} />;
    case 'card':
      return <ShareableCard {...props} />;
    default:
      return <Dashboard {...props} />;
  }
};
```

### Efficient Rendering

The application uses React's efficient rendering mechanisms:

1. **State Management**: State is managed at appropriate levels
2. **Conditional Rendering**: Components render only when needed
3. **Memoization**: Complex calculations are memoized when appropriate

## Deployment Architecture

### Build Process

The application uses Vite for building:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Containerization

The application includes a Dockerfile for containerization:

```dockerfile
# Base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

## Future Technical Enhancements

1. **Server-Side Components**: Add server-side rendering for improved SEO and performance
2. **API Proxy**: Implement server-side API proxy for security
3. **Offline Storage**: Add IndexedDB for offline data persistence
4. **PWA Features**: Implement service workers for offline functionality
5. **State Management Library**: Consider Redux or Context API for more complex state management
6. **Testing Framework**: Add Jest and React Testing Library for comprehensive testing
7. **CI/CD Pipeline**: Implement automated testing and deployment
8. **Analytics Integration**: Add privacy-focused analytics for usage tracking
9. **Accessibility Testing**: Implement automated accessibility testing
10. **Performance Monitoring**: Add real-user monitoring for performance tracking

