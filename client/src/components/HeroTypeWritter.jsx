import React, { useEffect, useState } from "react";

const HeroTypeWritter = ({ words, speed }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const currentWord = words[currentWordIndex];

  useEffect(() => {
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setCurrentText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentWordIndex((prevIndex) =>
            prevIndex === words.length - 1 ? 0 : prevIndex + 1
          );
        }, 1000);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentWordIndex, speed, words]);

  return (
    <span className="tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pp to-ps">
      {currentText}
    </span>
  );
};

export default HeroTypeWritter;
