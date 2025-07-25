import { AccessToken } from 'livekit-server-sdk';

export interface ParticipantInfo {
  identity: string;
  name: string;
  metadata?: string;
}

// Domain validation function
function validateDomain(origin: string): boolean {
  const allowedOrigins = process.env.NEXT_PUBLIC_ALLOWED_ORIGINS?.split(',') || [];
  const allowedOrigin = process.env.ALLOWED_ORIGIN;

  // In development, allow all origins
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  // Check against allowed origins
  return allowedOrigins.includes(origin) || origin === allowedOrigin;
}

export async function createAccessToken(
  participantInfo: ParticipantInfo,
  roomName: string,
  origin?: string
): Promise<string> {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set');
  }

  // Validate domain if origin is provided
  if (origin && !validateDomain(origin)) {
    throw new Error('Unauthorized domain');
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantInfo.identity,
    name: participantInfo.name,
    metadata: participantInfo.metadata,
  });

  token.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  });

  return await token.toJwt();
}

// Get LiveKit URL with fallback
export function getLiveKitUrl(): string {
  return process.env.NEXT_PUBLIC_WS_URL || process.env.LIVEKIT_URL || 'wss://your-livekit-server.com';
}