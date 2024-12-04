import React from "react";

interface ResultsProps {
  wpm: number;
  errors: number;
  snippet: string;
}

const Results: React.FC<ResultsProps> = ({ wpm, errors, snippet }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Your Results</h2>
      <p><strong>Snippet:</strong> {snippet}</p>
      <p><strong>WPM:</strong> {wpm}</p>
      <p><strong>Errors:</strong> {errors}</p>
    </div>
  );
};

export default Results;
