import React, { useState, useEffect } from 'react';

function TypewriterText({ text, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId); //This will reset interval when component is completed
  }, [text, speed]);

  return <pre className="text-gray-300 whitespace-pre-wrap">{displayedText}</pre>;
}

export default TypewriterText;
