"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const generateRoomId = () => {
    const adjectives = ["Cozy", "Bright", "Mystic", "Azure", "Golden", "Silver", "Crystal", "Emerald", "Crimson", "Peaceful", "Whimsical", "Enchanted", "Serene", "Vibrant", "Cosmic"];
    const nouns = ["Lounge", "Chamber", "Haven", "Sanctuary", "Studio", "Parlor", "Alcove", "Retreat", "Gallery", "Library", "Workshop", "Conservatory", "Observatory", "Pavilion", "Atrium"];
    const randomNum = Math.floor(Math.random() * 10000);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${nouns[Math.floor(Math.random() * nouns.length)]}-${randomNum}`;
  };

  useEffect(() => {
    const roomId = generateRoomId();
    router.push(`/room/${encodeURIComponent(roomId)}`);
  }, [router]);
  //test
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
          Sammy Agents
        </h1>
        <p className="text-slate-600 mb-6 text-center">
          Redirecting to a random room...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    </div>
  );
}
