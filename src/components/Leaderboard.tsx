"use client";

import React, { useEffect, useState } from "react";
import { database } from "@/services/firebase";
import { ref, onValue } from "firebase/database";

// Define the structure of the data from Firebase
interface FirebaseEntry {
  username: string;
  wpm: number;
}

interface LeaderboardEntry {
  username: string;
  wpm: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Reference to the 'scores' node in the database
    const scoresRef = ref(database, "scores");

    // Fetch data in real-time
    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val() as Record<string, FirebaseEntry> | null;

      if (data) {
        // Transform the object into an array and ensure type safety
        const entries: LeaderboardEntry[] = Object.values(data).map((entry) => ({
          username: entry.username,
          wpm: entry.wpm,
        }));

        // Sort by WPM descending
        entries.sort((a, b) => b.wpm - a.wpm);

        // Update the leaderboard state
        setLeaderboard(entries);
      } else {
        // Handle case where there's no data
        setLeaderboard([]);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index} className="mb-2">
              {index + 1}. {entry.username} - {entry.wpm} WPM
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available yet.</p>
      )}
    </div>
  );
};

export default Leaderboard;
