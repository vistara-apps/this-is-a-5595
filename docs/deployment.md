# Zara Rights - Deployment Guide

This document provides comprehensive instructions for deploying the Zara Rights application to production environments.

## Prerequisites

Before deploying the application, ensure you have the following:

1. **API Keys**:
   - OpenAI API key (or OpenRouter API key)
   - Stripe API key (for payment features, if implemented)

2. **Environment Setup**:
   - Node.js (v16+)
   - npm or yarn
   - Access to a hosting platform (Vercel, Netlify, AWS, etc.)

3. **Domain Configuration**:
   - Registered domain name (optional)
   - SSL certificate (required for geolocation and recording features)

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_OPENAI_API_KEY | API key for OpenAI or OpenRouter | Yes |
| VITE_STRIPE_PUBLIC_KEY | Public key for Stripe integration | No (for future use) |
| VITE_APP_ENV | Environment name (development, staging, production) | No (defaults to development) |
| VITE_API_BASE_URL | Base URL for API calls (if using a proxy) | No |

## Build Process

### Local Build

To build the application locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with required environment variables:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Preview the build:
   ```bash
   npm run preview
   ```

The built files will be in the `dist` directory.

### Docker Build

To build and run the application using Docker:

1. Build the Docker image:
   ```bash
   docker build -t zara-rights .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 -e VITE_OPENAI_API_KEY=your_api_key_here zara-rights
   ```

The application will be available at http://localhost:8080.

## Deployment Options

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel
   ```

4. Configure environment variables in the Vercel dashboard.

### Netlify Deployment

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy the application:
   ```bash
   netlify deploy
   ```

4. Configure environment variables in the Netlify dashboard.

### AWS S3 + CloudFront Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Upload the `dist` directory to an S3 bucket:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/ --delete
   ```

3. Configure CloudFront to serve the S3 bucket.

4. Set up environment variables using AWS Parameter Store or similar service.

## Security Considerations

### API Key Protection

In production, API keys should not be exposed to the client. Consider implementing a server-side proxy for API calls:

1. Create a simple server (Node.js/Express) to proxy API requests
2. Store API keys securely on the server
3. Update the application to call your proxy endpoint instead of directly calling external APIs

Example server-side proxy:

```javascript
// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/generate-card', async (req, res) => {
  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'google/gemini-2.0-flash-001',
      messages: req.body.messages,
      max_tokens: req.body.max_tokens,
      temperature: req.body.temperature
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('API proxy error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(3000, () => {
  console.log('API proxy server running on port 3000');
});
```

### CORS Configuration

If using a server-side proxy, configure CORS appropriately:

```javascript
const cors = require('cors');

// Allow requests only from your application domain
app.use(cors({
  origin: 'https://your-app-domain.com'
}));
```

### Content Security Policy

Implement a Content Security Policy to prevent XSS attacks:

```html
<!-- In index.html -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; connect-src 'self' https://openrouter.ai; img-src 'self' data:; style-src 'self' 'unsafe-inline';">
```

## Performance Optimization

### Asset Optimization

1. Enable gzip/Brotli compression on your server:
   ```
   # Nginx configuration example
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. Configure proper caching headers:
   ```
   # Nginx configuration example
   location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
     expires 30d;
     add-header Cache-Control "public, no-transform";
   }
   ```

### CDN Integration

Use a Content Delivery Network (CDN) to serve static assets:

1. Configure your CDN to cache static assets
2. Update asset URLs to use your CDN domain
3. Set appropriate cache control headers

## Monitoring and Analytics

### Error Tracking

Implement error tracking using a service like Sentry:

1. Install Sentry:
   ```bash
   npm install @sentry/react
   ```

2. Initialize Sentry in your application:
   ```javascript
   import * as Sentry from '@sentry/react';

   Sentry.init({
     dsn: "your-sentry-dsn",
     environment: import.meta.env.VITE_APP_ENV || 'development',
     tracesSampleRate: 1.0,
   });
   ```

### Performance Monitoring

Implement Real User Monitoring (RUM) to track application performance:

1. Configure Web Vitals reporting:
   ```javascript
   import { getCLS, getFID, getLCP } from 'web-vitals';

   function sendToAnalytics(metric) {
     // Send to your analytics service
     console.log(metric);
   }

   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getLCP(sendToAnalytics);
   ```

## Continuous Integration/Deployment

### GitHub Actions Example

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Backup and Disaster Recovery

### Backup Strategy

1. **Code Repository**: Ensure your code is backed up in multiple locations
2. **Environment Configuration**: Document and securely store environment variables
3. **User Data**: If implementing user accounts, ensure regular database backups

### Disaster Recovery Plan

1. **Rollback Procedure**: Document steps to roll back to previous versions
2. **API Fallbacks**: Implement fallbacks for external API dependencies
3. **Monitoring Alerts**: Set up alerts for critical failures

## Production Checklist

Before final deployment, verify the following:

- [ ] All environment variables are configured
- [ ] API keys are properly secured
- [ ] Build process completes successfully
- [ ] All features work as expected in the production build
- [ ] Performance metrics meet targets
- [ ] Security measures are implemented
- [ ] Error tracking is configured
- [ ] Analytics are set up
- [ ] Documentation is complete
- [ ] Backup and recovery procedures are in place

## Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Verify environment variables are correctly set
   - Check for API key restrictions (domain limitations)
   - Ensure API keys have necessary permissions

2. **CORS Errors**:
   - Verify CORS configuration on server-side proxy
   - Check browser console for specific CORS errors

3. **Build Failures**:
   - Check for dependency conflicts
   - Verify Node.js version compatibility
   - Review build logs for specific errors

### Support Resources

- GitHub Repository: [Link to repository]
- Documentation: [Link to documentation]
- Issue Tracker: [Link to issue tracker]

## Maintenance Procedures

### Regular Updates

1. **Dependency Updates**:
   ```bash
   npm outdated  # Check for outdated dependencies
   npm update    # Update dependencies
   ```

2. **Security Audits**:
   ```bash
   npm audit     # Check for security vulnerabilities
   npm audit fix # Fix security vulnerabilities
   ```

### Monitoring

1. **Server Health**: Monitor server health metrics (CPU, memory, disk)
2. **API Usage**: Track API usage to prevent quota limits
3. **Error Rates**: Monitor application error rates and types

## Conclusion

Following this deployment guide will help ensure a smooth, secure, and performant deployment of the Zara Rights application. Adjust the procedures as needed for your specific hosting environment and requirements.

