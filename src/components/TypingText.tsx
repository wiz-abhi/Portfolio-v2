import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number; // milliseconds per character
}

export const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayed}
      <span className="inline-block ml-1 text-gray-400 animate-blink" style={{ WebkitTextFillColor: '#9ca3af' }}>|</span>
    </span>
  );
};
