import { useEffect, useState } from "react";

// Array of motivational quotes
const quotes = [
  "Believe in yourself and all that you are.",
  "Success is not the key to happiness; happiness is the key to success.",
  "Stay positive, work hard, make it happen.",
  "Your limitation it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you; you have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it."
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

export default function MotivationalQuote() {
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    const intervalId = setInterval(() => setQuote(getRandomQuote()), 10000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="motivational-quote h-32 w-full flex items-center p-6 bg-yellow-50 border border-yellow-200 rounded-xl shadow-md">
      <p className="text-base font-semibold italic text-yellow-800 leading-relaxed tracking-wide">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  );
}
