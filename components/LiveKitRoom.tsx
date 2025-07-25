'use client';

import { useState, useEffect } from 'react';
import {
  RoomContext,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
} from '@livekit/components-react';
import { Room } from 'livekit-client';
import '@livekit/components-styles';

interface LiveKitRoomProps {
  roomName: string;
  participantName: string;
  participantIdentity?: string;
}

export default function LiveKitRoom({
  roomName,
  participantName,
  participantIdentity,
}: LiveKitRoomProps) {
  const [room] = useState(new Room());
  const [token, setToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identity: participantIdentity || participantName,
            name: participantName,
            roomName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch token');
        }

        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [roomName, participantName, participantIdentity]);

  const handleConnect = async () => {
    if (!token || !process.env.NEXT_PUBLIC_LIVEKIT_URL) return;
    
    try {
      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL, token);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <RoomContext.Provider value={room}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Voice Assistant Room: {roomName}
            </h1>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Participant: {participantName}</p>
              {!isConnected ? (
                <button
                  onClick={handleConnect}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!token}
                >
                  Connect to Voice Assistant
                </button>
              ) : (
                <div className="text-green-600 font-semibold">Connected to room</div>
              )}
            </div>
            
            {isConnected && (
              <>
                <SimpleVoiceAssistant />
                <div className="mt-6">
                  <VoiceAssistantControlBar />
                </div>
              </>
            )}
            
            <RoomAudioRenderer />
          </div>
        </div>
      </RoomContext.Provider>
    </div>
  );
}

function SimpleVoiceAssistant() {
  const { state, audioTrack } = useVoiceAssistant();
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-center">Voice Assistant</h2>
      <div className="h-80 flex flex-col items-center justify-center">
        <div className="mb-4 w-full max-w-md">
          <BarVisualizer 
            state={state} 
            barCount={5} 
            trackRef={audioTrack} 
            className="w-full h-32"
          />
        </div>
        <p className="text-center text-lg font-medium capitalize">
          Status: {state}
        </p>
      </div>
    </div>
  );
}