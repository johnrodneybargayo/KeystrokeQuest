"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTimer } from "@/hooks/useTimer";
import { getRandomCodeSnippet } from "@/lib/codeSnippets";
import { Button } from "@/components/ui/button";

const TIME_OPTIONS = [60, 120, 180, 300]; // Durations in seconds

export function CodeTypingTest() {
  const [codeToType, setCodeToType] = useState("");
  const [userInput, setUserInput] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [username, setUsername] = useState("");
  const [selectedTime, setSelectedTime] = useState(60);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { timeLeft, resetTimer, startTimer } = useTimer(selectedTime);

  /**
   * Initialize the code snippet on component mount.
   */
  useEffect(() => {
    setCodeToType(getRandomCodeSnippet());
  }, []);

  /**
   * Calculates Words Per Minute (WPM) based on user input and selected time.
   */
  const calculateWpm = useCallback(() => {
    const wordsTyped = userInput.trim().split(/\s+/).length;
    setWpm(Math.floor((wordsTyped / selectedTime) * 60));
  }, [userInput, selectedTime]);

  /**
   * Triggered when time runs out, stops the test and shows results.
   */
  useEffect(() => {
    if (timeLeft === 0) {
      setIsTestRunning(false);
      calculateWpm();
      setShowModal(true);
    }
  }, [timeLeft, calculateWpm]);

  /**
   * Calculates typing accuracy based on correct characters typed.
   */
  const calculateAccuracy = (input: string) => {
    const correctChars = codeToType.slice(0, input.length).split("");
    const userChars = input.split("");
    const correctCount = userChars.reduce(
      (count, char, index) => (char === correctChars[index] ? count + 1 : count),
      0
    );
    return Math.floor((correctCount / userChars.length) * 100) || 100;
  };

  /**
   * Handles user input in the typing area.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isTestRunning) {
      setIsTestRunning(true);
      startTimer();
    }

    setUserInput(value);
    setAccuracy(calculateAccuracy(value));
  };

  /**
   * Handles time selection changes.
   */
  const handleTimeSelection = (time: number) => {
    setSelectedTime(time);
    if (!isTestRunning) {
      resetTimer();
    }
  };

  /**
   * Resets the typing test.
   */
  const resetTest = () => {
    setIsTestRunning(false);
    setUserInput("");
    setAccuracy(100);
    setWpm(0);
    setCodeToType(getRandomCodeSnippet());
    resetTimer();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 md:p-8 lg:p-16">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        KeystrokeQuest - Code Typing Test
      </h1>
      <p className="text-center mb-8 text-sm md:text-lg">
        Master your coding speed and accuracy
      </p>

      {/* Time Selection Buttons */}
      <div className="flex gap-2 mb-4">
        {TIME_OPTIONS.map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded-lg text-sm md:text-base ${
              selectedTime === time
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

      {/* Code to Type */}
      {codeToType && (
        <div
          className="w-full md:w-2/3 lg:w-1/2 bg-gray-900 p-4 rounded-lg overflow-y-auto mb-4"
          style={{
            maxHeight: "300px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            overflowX: "hidden", // Prevent horizontal scrolling
          }}
        >
          {codeToType.split("\n").map((line, lineIndex) => (
            <div key={lineIndex}>
              {line.split("").map((char, charIndex) => {
                const globalIndex =
                  codeToType
                    .split("\n")
                    .slice(0, lineIndex)
                    .join("\n").length + charIndex;

                const isCurrent = globalIndex === userInput.length;
                const isCorrect = userInput[globalIndex] === char;

                return (
                  <span
                    key={charIndex}
                    className={`${
                      isCurrent
                        ? "bg-yellow-300"
                        : isCorrect
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
              {/* Add Enter indicator */}
              {lineIndex < codeToType.split("\n").length - 1 && (
                <span className="text-blue-400 ml-2">↵</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Typing Input */}
      <textarea
        className="w-full md:w-2/3 lg:w-1/2 p-4 bg-gray-800 text-white rounded-lg mb-4 resize-none"
        rows={5}
        placeholder="Start typing the code here..."
        value={userInput}
        onChange={handleInputChange}
        autoFocus
      ></textarea>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={resetTest}>Reset</Button>
        <Button onClick={() => console.log("View Scoreboard")}>
          View Scoreboard
        </Button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 right-4 text-sm md:text-base text-right">
        <p>Time Left: {timeLeft}s</p>
        <p>Accuracy: {accuracy}%</p>
        <p>WPM: {wpm}</p>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
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
              <Button onClick={() => console.log("Save Score")}>
                Save Score
              </Button>
              <Button onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
