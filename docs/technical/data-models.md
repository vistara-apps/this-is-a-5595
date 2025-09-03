# Zara Rights - Data Models

This document outlines the data models used in the Zara Rights application, their attributes, relationships, and implementation details.

## User

The User entity represents an application user and their preferences.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| userId | String | Unique identifier for the user |
| preferredLanguage | String | User's preferred language (e.g., 'en', 'es') |
| emergencyContacts | Array | List of emergency contacts to alert during incidents |
| analyticsOptIn | Boolean | Whether the user has opted into analytics tracking |

### Implementation

The User model is implemented as a React state object in the main App component:

```jsx
const [user, setUser] = useState({
  userId: 'user-1',
  preferredLanguage: 'en',
  emergencyContacts: [],
  analyticsOptIn: true
});
```

### Relationships

- A User has many InteractionSessions (one-to-many)

## ScenarioGuide

The ScenarioGuide entity represents a legal scenario with associated rights information.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| scenarioId | String | Unique identifier for the scenario |
| title | Object | Multilingual titles for the scenario (e.g., {en: 'Traffic Stop', es: 'Parada de Tráfico'}) |
| content | Object | Structured content with rights, phrases, dos, and don'ts in multiple languages |
| keywords | Array | Keywords associated with the scenario for search functionality |
| stateSpecificLaws | Boolean | Whether this scenario has state-specific legal variations |

### Implementation

Scenario data is implemented as a static JavaScript array in `src/data/scenarios.js`:

```javascript
export const scenarioData = [
  {
    scenarioId: 'traffic-stop',
    title: {
      en: 'Traffic Stop',
      es: 'Parada de Tráfico'
    },
    content: {
      en: {
        rights: [...],
        phrases: [...],
        dos: [...],
        donts: [...]
      },
      es: {
        rights: [...],
        phrases: [...],
        dos: [...],
        donts: [...]
      }
    },
    keywords: ['traffic', 'police', 'car', 'driving', 'stop'],
    stateSpecificLaws: true
  },
  // Additional scenarios...
];
```

## InteractionSession

The InteractionSession entity represents a recorded interaction with law enforcement.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| sessionId | String | Unique identifier for the session |
| userId | String | Reference to the user who created the session |
| scenarioId | String | Reference to the scenario this session relates to |
| startTime | Number | Timestamp when the recording started |
| endTime | Number | Timestamp when the recording ended |
| recordingData | Array | Blob chunks of the recorded audio |
| alertSent | Boolean | Whether an emergency alert was sent |
| location | Object | Geolocation data (latitude, longitude, timestamp) |
| generatedCardUrl | String | URL to the generated shareable card (if created) |

### Implementation

The InteractionSession is created dynamically during recording sessions:

```javascript
const session = {
  sessionId: `session-${Date.now()}`,
  userId: 'user-1',
  scenarioId: scenario?.scenarioId || 'emergency',
  startTime: Date.now() - (recordingTime * 1000),
  endTime: Date.now(),
  recordingData: recordingDataRef.current,
  alertSent,
  location
};
```

### Relationships

- An InteractionSession belongs to a User (many-to-one)
- An InteractionSession is associated with a ScenarioGuide (many-to-one)

## ShareableCard

The ShareableCard entity represents a generated rights summary card that can be shared.

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| title | String | Title of the card |
| content | String | Generated content of the card |
| shareUrl | String | URL for sharing the card |
| timestamp | Number | When the card was generated |
| language | String | Language of the card content |
| scenario | String | Reference to the scenario this card relates to |

### Implementation

ShareableCards are generated using the OpenAI API and returned as structured objects:

```javascript
return {
  title: `${scenarioTitle} - ${language === 'es' ? 'Resumen de Derechos' : 'Rights Summary'}`,
  content: generatedContent,
  shareUrl: `${window.location.origin}/shared/${Date.now()}`,
  timestamp: Date.now(),
  language,
  scenario: scenario?.scenarioId
};
```

## Data Flow

1. Users select a ScenarioGuide from the Dashboard
2. They can view rights information or start an InteractionSession (recording)
3. After an InteractionSession, a ShareableCard can be generated
4. All user interactions are associated with their User profile

## Storage Strategy

Currently, the application uses in-memory storage for the session. In a production environment, these models would be persisted to a database with appropriate security measures, especially for sensitive recording data.

## Future Enhancements

1. **User Authentication**: Implement secure user authentication and profile management
2. **Encrypted Storage**: Add encryption for sensitive recording data
3. **Offline Support**: Implement local storage for offline functionality
4. **Sync Mechanism**: Add synchronization for multi-device support

