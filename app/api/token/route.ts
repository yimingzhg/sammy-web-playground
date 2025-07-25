import { NextRequest, NextResponse } from 'next/server';
import { createAccessToken } from '@/lib/livekit';

export async function POST(request: NextRequest) {
  try {
    const { identity, name, roomName, metadata } = await request.json();

    if (!identity || !roomName) {
      return NextResponse.json(
        { error: 'identity and roomName are required' },
        { status: 400 }
      );
    }

    const token = await createAccessToken(
      {
        identity,
        name: name || identity,
        metadata,
      },
      roomName
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error creating access token:', error);
    return NextResponse.json(
      { error: 'Failed to create access token' },
      { status: 500 }
    );
  }
}