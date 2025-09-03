# Zara Rights

Your instant guide to legal rights in your pocket.

![Zara Rights Screenshot](https://i.imgur.com/026e643b.jpeg)

## Overview

Zara Rights is a mobile-optimized web application that provides instant access to legal rights information and tools for individuals interacting with law enforcement. The application offers scenario-based legal guides, multilingual support, emergency recording capabilities, and AI-generated shareable content.

## Core Features

### On-Demand Legal Cheat Sheets
Mobile-optimized, one-page interactive guides detailing user rights and 'what to say' scripts for common scenarios (e.g., traffic stops, questioning). Includes key 'do's and 'don'ts'.

### Multi-Language Support
Key legal information and 'what to say' scripts are translated into multiple languages, starting with Spanish.

### Quick Record & Alert
A single-tap button to initiate audio/video recording (as permitted by law) and send an emergency alert with the user's current location to pre-selected contacts.

### Dynamic Content Generation (Remix)
Automatically generates a shareable 'rights card' summarizing key information tailored to the user's location and selected scenario, leveraging AI.

## Technology Stack

- **Frontend**: React, Vite, Tailwind CSS
- **APIs**: OpenAI (via OpenRouter), Browser APIs (MediaDevices, Geolocation)
- **Deployment**: Docker, Nginx

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-5595.git
   cd this-is-a-5595
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with required environment variables:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [Technical Specifications](docs/technical/data-models.md)
- [API Documentation](docs/api/api-documentation.md)
- [UI/UX Requirements](docs/ui-ux/design-system.md)
- [Business Logic](docs/business-logic/feature-implementation.md)
- [Deployment Guide](docs/deployment.md)

## Project Structure

```
src/
├── components/       # UI components
├── data/             # Static data and content
├── services/         # API and service integrations
├── App.jsx           # Main application component
├── index.css         # Global styles
└── main.jsx          # Application entry point
```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## Deployment

See the [Deployment Guide](docs/deployment.md) for detailed instructions on deploying the application to production environments.

## Legal Disclaimer

The legal information provided by this application is for informational purposes only and does not constitute legal advice. Laws vary by jurisdiction, and the application attempts to provide general guidance that may not apply to specific situations or locations. Users should consult with a qualified attorney for advice regarding their specific circumstances.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- OpenAI for providing the AI capabilities
- React and Vite teams for the development framework
- Tailwind CSS for the styling framework
- All contributors to the project

