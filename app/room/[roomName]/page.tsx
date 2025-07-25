"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import LiveKitRoom from "@/components/LiveKitRoom";

export default function RoomPage() {
  const params = useParams();
  const roomName = params.roomName as string;
  const [participantName, setParticipantName] = useState("");
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (participantName.trim()) {
      setHasJoined(true);
    }
  };

  if (!hasJoined) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Join Room: {decodeURIComponent(roomName)}
          </h1>
          <form onSubmit={handleJoinRoom}>
            <div className="mb-4">
              <label
                htmlFor="participantName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="participantName"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      roomName={decodeURIComponent(roomName)}
      participantName={participantName}
    />
  );
}
