# Zara Rights - API Documentation

This document provides comprehensive documentation for all external API integrations used in the Zara Rights application.

## OpenAI API (via OpenRouter)

The application uses OpenAI's API through OpenRouter for generating dynamic content for shareable rights cards.

### Configuration

```javascript
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});
```

### Endpoints

#### Chat Completions

**Endpoint:** `POST /v1/chat/completions`

**Purpose:** Generate legal rights summaries and shareable content based on scenario context.

**Request Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| model | String | The AI model to use (e.g., 'google/gemini-2.0-flash-001') |
| messages | Array | Array of message objects with role and content |
| max_tokens | Number | Maximum number of tokens to generate |
| temperature | Number | Controls randomness (0-1, lower is more deterministic) |

**Example Request:**

```javascript
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
```

**Response Format:**

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "Generated content here..."
      }
    }
  ]
}
```

**Error Handling:**

The application implements a fallback mechanism when the API call fails:

```javascript
try {
  // API call
} catch (error) {
  console.error('Failed to generate AI card:', error);
  // Return fallback content
  return createFallbackCard(scenario, language);
}
```

### Security Considerations

- API keys are stored in environment variables
- Fallback mechanism ensures the application works even if the API is unavailable
- Content generation is bounded by max_tokens to prevent excessive costs

## Browser Geolocation API

The application uses the browser's Geolocation API to obtain the user's location during emergency recordings.

### Endpoints

#### Get Current Position

**Method:** `navigator.geolocation.getCurrentPosition()`

**Purpose:** Obtain the user's current geographical location.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| successCallback | Function | Function called with position data on success |
| errorCallback | Function | Function called with error information on failure |

**Example Usage:**

```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Date.now()
    });
  },
  (error) => {
    console.error('Location access denied:', error);
  }
);
```

**Response Format:**

```javascript
{
  coords: {
    latitude: 37.7749, // Example latitude
    longitude: -122.4194, // Example longitude
    accuracy: 10, // Accuracy in meters
    // Additional properties may be available
  },
  timestamp: 1625097600000 // Timestamp when position was obtained
}
```

**Error Handling:**

The application gracefully handles permission denials by continuing to function without location data.

### Security and Privacy Considerations

- Location data is only requested when explicitly needed for emergency recording
- Permission is requested from the user before accessing location
- Location data is only stored temporarily in the session object

## MediaDevices API

The application uses the browser's MediaDevices API to access the user's microphone for recording.

### Endpoints

#### Get User Media

**Method:** `navigator.mediaDevices.getUserMedia()`

**Purpose:** Access the user's media devices (microphone in this case).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| constraints | Object | Specifies the types of media to request (audio/video) |

**Example Usage:**

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ 
  audio: true, 
  video: false 
});
```

**Response:**

Returns a MediaStream object that can be used with a MediaRecorder.

**Error Handling:**

```javascript
try {
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: true, 
    video: false 
  });
  // Success handling
} catch (error) {
  setErrorMessage('Microphone access required for recording. Please enable permissions.');
  console.error('Permission denied:', error);
}
```

### Security and Privacy Considerations

- Microphone access is only requested when explicitly needed for recording
- Permission is requested from the user before accessing the microphone
- Recording data is only stored temporarily in memory

## Stripe API (Future Implementation)

The PRD specifies Stripe as a potential payment gateway for micro-transactions. This section outlines the planned implementation.

### Configuration (Planned)

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

### Endpoints (Planned)

#### Create Payment Intent

**Endpoint:** `POST /v1/payment_intents`

**Purpose:** Create a payment intent for premium content purchases.

**Request Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| amount | Number | Amount to charge (in smallest currency unit) |
| currency | String | Three-letter currency code (e.g., 'usd') |
| payment_method_types | Array | Accepted payment method types |
| metadata | Object | Additional information about the transaction |

**Example Request (Planned):**

```javascript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 500, // $5.00
  currency: 'usd',
  payment_method_types: ['card'],
  metadata: {
    contentId: 'premium-scenario-1',
    userId: 'user-123'
  }
});
```

**Implementation Status:** Planned for future release

## Integration Architecture

The application follows a client-side integration architecture:

1. **OpenAI/OpenRouter**: Direct integration from the client for content generation
2. **Browser APIs**: Native browser APIs for geolocation and media recording
3. **Stripe (Planned)**: Server-side integration for payment processing

## Error Handling Strategy

The application implements a comprehensive error handling strategy:

1. **Graceful Degradation**: Features that require API access have fallbacks
2. **User Feedback**: Clear error messages are displayed to users
3. **Logging**: Errors are logged to the console for debugging
4. **Retry Mechanism**: Not currently implemented but planned for production

## Rate Limiting and Quotas

- **OpenAI/OpenRouter**: Subject to API provider rate limits and quotas
- **Browser APIs**: No rate limits but subject to user permissions
- **Stripe (Planned)**: Subject to Stripe's rate limits and fraud detection

## Future API Enhancements

1. **Server-Side Processing**: Move API calls to a server to protect API keys
2. **Caching Layer**: Implement caching for frequently requested content
3. **Webhook Integration**: Add webhook support for asynchronous processing
4. **Analytics Integration**: Add analytics API for usage tracking

