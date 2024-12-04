// src/lib/codeSnippets.ts

export const codeSnippets = [
  `import React from 'react';

  const Button = ({ children, onClick }) => {
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  export default Button;`,

  `import React, { useState } from 'react';

  const Counter = () => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
        <span className="text-2xl font-semibold">{count}</span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </div>
    );
  };

  export default Counter;`,

  `import React from 'react';

  const Card = ({ title, description, imageUrl }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={imageUrl} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    );
  };

  export default Card;`,
];

export function getRandomCodeSnippet(): string {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex];
}
