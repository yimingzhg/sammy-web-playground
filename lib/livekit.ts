import { AccessToken } from 'livekit-server-sdk';

export interface ParticipantInfo {
  identity: string;
  name: string;
  metadata?: string;
}

export async function createAccessToken(
  participantInfo: ParticipantInfo,
  roomName: string
): Promise<string> {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set');
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