# Deployment Configuration Guide

## Environment Variables Setup

Set the following environment variables in your Vercel deployment:

### Required Environment Variables

```bash
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
LIVEKIT_URL=wss://your-livekit-server.com

# Domain Whitelist Configuration
ALLOWED_ORIGIN=https://your-domain.vercel.app
NEXT_PUBLIC_ALLOWED_ORIGINS=https://your-domain.vercel.app,https://www.your-domain.com

# WebSocket Configuration
NEXT_PUBLIC_WS_URL=wss://your-livekit-server.com

# Security Configuration
NODE_ENV=production
```

## Vercel Configuration

The `vercel.json` file has been configured with:

1. **WebSocket Support**: Routes configured for LiveKit API endpoints
2. **CORS Headers**: Proper cross-origin resource sharing configuration
3. **Security Headers**: X-Frame-Options, X-Content-Type-Options, and Referrer-Policy
4. **Function Timeouts**: Extended timeout for API functions (30 seconds)

## Next.js Configuration

The `next.config.ts` file includes:

1. **WebSocket Fallbacks**: Proper webpack configuration for client-side WebSocket support
2. **CORS Headers**: Dynamic CORS configuration based on environment
3. **Security Headers**: Additional security headers for production
4. **API Rewrites**: Proper routing for LiveKit API endpoints

## Domain Whitelisting

### For Production:

1. Set `ALLOWED_ORIGIN` to your production domain
2. Set `NEXT_PUBLIC_ALLOWED_ORIGINS` to include all allowed domains (comma-separated)
3. Update LiveKit server configuration to allow your domain

### For Development:

- CORS is set to allow all origins (`*`) in development mode
- WebSocket connections are allowed from localhost

## LiveKit Server Configuration

Make sure your LiveKit server is configured to:

1. **Allow WebSocket connections** from your domain
2. **Set proper CORS headers** for your domain
3. **Configure room access** with proper authentication

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Domain Validation**: Always validate domains in production
3. **HTTPS Only**: Ensure all connections use HTTPS in production
4. **Rate Limiting**: Consider implementing rate limiting for API endpoints

## Troubleshooting

### WebSocket Connection Issues:
- Check if LiveKit server allows your domain
- Verify WebSocket URL is correct
- Ensure CORS headers are properly set

### CORS Issues:
- Verify `ALLOWED_ORIGIN` matches your domain exactly
- Check that credentials are properly configured
- Ensure preflight requests are handled

### Deployment Issues:
- Verify all environment variables are set in Vercel
- Check function timeout settings
- Ensure proper build configuration 