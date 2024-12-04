import React, { useState, useEffect } from "react";

interface TypingTestProps {
  snippet: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ snippet }) => {
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    // Start the timer when the user starts typing
    if (input.length === 1 && !startTime) {
      setStartTime(new Date());
    }

    // Recalculate WPM whenever input changes
    if (startTime) {
      const elapsedMinutes = (new Date().getTime() - startTime.getTime()) / 60000;
      setWpm(Math.max(Math.round((input.length / 5 - errors) / elapsedMinutes), 0)); // Ensure WPM doesn't go negative
    }
  }, [input, startTime, errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Check for errors in the current character
    if (value[value.length - 1] !== snippet[value.length - 1]) {
      setErrors((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Typing Test</h1>

      {/* Snippet Display */}
      <p
        className="bg-gray-800 p-4 rounded-md text-lg mb-4 whitespace-pre-wrap"
        style={{ fontFamily: "monospace" }}
      >
        {snippet.split("").map((char, index) => {
          const isCorrect = input[index] === char;
          const isCurrent = index === input.length;

          return (
            <span
              key={index}
              className={`${
                isCurrent
                  ? "bg-yellow-500"
                  : isCorrect
                  ? "text-green-500"
                  : index < input.length
                  ? "text-red-500"
                  : ""
              }`}
            >
              {char}
            </span>
          );
        })}
      </p>

      {/* Typing Input */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Start typing..."
        className="p-2 w-full md:w-1/2 rounded-md bg-gray-700 text-white mb-4"
        style={{ fontFamily: "monospace" }}
        autoFocus
      />

      {/* Stats Display */}
      <div className="text-center">
        <p>Errors: <span className="text-red-500">{errors}</span></p>
        <p>WPM: <span className="text-green-500">{wpm}</span></p>
      </div>
    </div>
  );
};

export default TypingTest;
