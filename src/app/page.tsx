"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";
import { getRandomCodeSnippet } from "@/lib/codeSnippets";
import { Button } from "@/components/ui/button";
import { database } from "@/services/firebase";
import { ref, push, onValue } from "firebase/database";

interface LeaderboardEntry {
  username: string;
  wpm: number;
}

const TIME_OPTIONS = [60, 120, 180, 300]; // Durations in seconds

const HomePage = () => {
  const [codeToType, setCodeToType] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [username, setUsername] = useState("");
  const [selectedTime, setSelectedTime] = useState(60);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { timeLeft, resetTimer, startTimer } = useTimer(selectedTime);

  // Fetch a random code snippet on mount
  useEffect(() => {
    const fetchSnippet = async () => {
      const snippet = await getRandomCodeSnippet();
      setCodeToType(snippet);
    };
    fetchSnippet();
  }, []);

  // Fetch leaderboard data from Firebase
  const fetchLeaderboard = () => {
    const scoresRef = ref(database, "scores");

    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const entries: LeaderboardEntry[] = Object.values(data).map((entry) => {
          const typedEntry = entry as { username: string; wpm: number }; // Type assertion
          return {
            username: typedEntry.username,
            wpm: typedEntry.wpm,
          };
        });

        entries.sort((a, b) => b.wpm - a.wpm); // Sort by WPM descending
        setLeaderboard(entries);
      }
    });

    setShowLeaderboard(true);
  };

  const calculateWpm = useCallback(() => {
    if (!timeLeft) return;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    setWpm(Math.floor((wordsTyped / (selectedTime - timeLeft)) * 60));
  }, [userInput, selectedTime, timeLeft]);

  const calculateAccuracy = useCallback(() => {
    if (!codeToType || userInput.length === 0) return setAccuracy(100);

    const correctChars = codeToType.slice(0, userInput.length).split("");
    const userChars = userInput.split("");
    const correctCount = userChars.reduce(
      (count, char, index) => (char === correctChars[index] ? count + 1 : count),
      0
    );

    setAccuracy(Math.floor((correctCount / userChars.length) * 100));
  }, [codeToType, userInput]);

  useEffect(() => {
    if (timeLeft === 0 && isTestRunning) {
      setIsTestRunning(false);
      calculateWpm();
      setShowModal(true);
    }
  }, [timeLeft, isTestRunning, calculateWpm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isTestRunning) {
      setIsTestRunning(true);
      startTimer();
    }

    setUserInput(value);
    calculateAccuracy();
  };

  const handleTimeSelection = (time: number) => {
    setSelectedTime(time);
    if (!isTestRunning) {
      resetTimer();
    }
  };

  const resetTest = () => {
    setIsTestRunning(false);
    setUserInput("");
    setAccuracy(100);
    setWpm(0);
    setCodeToType(null); // Reset code snippet
    setTimeout(() => {
      const snippet = getRandomCodeSnippet();
      setCodeToType(snippet);
    }, 100);
    resetTimer();
  };

  const saveScoreToFirebase = async () => {
    if (!username.trim()) {
      alert("Please enter your username to save your score.");
      return;
    }

    try {
      const scoresRef = ref(database, "scores");

      await push(scoresRef, {
        username,
        wpm,
        accuracy,
        timestamp: new Date().toISOString(),
      });

      alert("Score saved successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving score to Firebase:", error);
      alert("Failed to save score. Please try again.");
    }
  };

  if (!codeToType) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-16">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        KeystrokeQuest - Code Typing Test
      </h1>
      <p className="text-center mb-8 text-sm md:text-lg">
        Master your coding speed and accuracy
      </p>

      <div className="flex gap-2 mb-4">
        {TIME_OPTIONS.map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded-lg text-sm md:text-base ${selectedTime === time
              ? "bg-blue-500 text-white"
              : "bg-gray-700 text-gray-300"
              }`}
            onClick={() => handleTimeSelection(time)}
            disabled={isTestRunning}
          >
            {time / 60} min
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-xl font-bold">
          Timer: {isTestRunning ? timeLeft : "Not Started"} seconds
        </p>
      </div>

      <div
        className="w-full md:w-2/3 lg:w-1/2 bg-gray-900 p-4 rounded-lg overflow-y-auto mb-4"
        style={{
          maxHeight: "300px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        {codeToType.split("\n").map((line, lineIndex) => (
          <div key={lineIndex} className="flex items-start">
            {line.split("").map((char, charIndex) => {
              const globalIndex =
                codeToType
                  .split("\n")
                  .slice(0, lineIndex)
                  .join("\n").length +
                charIndex +
                lineIndex;

              const isCurrent = globalIndex === userInput.length;
              const isCorrect = userInput[globalIndex] === char;

              return (
                <span
                  key={charIndex}
                  className={`${isCurrent
                    ? "bg-yellow-300 text-black"
                    : isCorrect
                      ? "text-green-500"
                      : globalIndex < userInput.length
                        ? "text-red-500"
                        : "text-white"
                    }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <textarea
        className="w-full md:w-2/3 lg:w-1/2 p-4 bg-gray-800 text-white rounded-lg mb-4 resize-none"
        rows={5}
        placeholder="Start typing the code here..."
        value={userInput}
        onChange={handleInputChange}
        autoFocus
      ></textarea>

      <div className="flex gap-4">
        <Button
          onClick={resetTest}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </Button>
        <Button
          onClick={fetchLeaderboard}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          View Scoreboard
        </Button>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center text-black">
            <h2 className="text-xl font-bold mb-4">Your Results</h2>
            <p className="mb-2">WPM: {wpm}</p>
            <p className="mb-4">Accuracy: {accuracy}%</p>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md p-2 mb-4 w-full"
            />
            <div className="flex gap-4 justify-center">
              <Button onClick={saveScoreToFirebase}>Save Score</Button>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-black max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <ul>
              {leaderboard.map((entry, index) => (
                <li key={index} className="mb-2">
                  {index + 1}. {entry.username} - {entry.wpm} WPM
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <Button onClick={() => setShowLeaderboard(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
