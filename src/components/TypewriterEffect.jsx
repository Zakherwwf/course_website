import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

// Reusable CSS for animations
const styles = `
  .typewriter-word {
    display: inline-block;
    opacity: 0;
    animation: fadeInWord 0.4s forwards;
  }
  .typewriter-char {
    display: inline-block;
    opacity: 0;
    animation: fadeInChar 0.8s forwards;
  }
  @keyframes fadeInWord {
    to { opacity: 1; }
  }
  @keyframes fadeInChar {
    to { opacity: 1; }
  }
`;

export const TypewriterEffectSmooth = ({ words }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderWords = () => {
    let charDelay = 0;
    return (
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-center">
        {words.map((word, wordIdx) => {
          const wordElement = (
            <div
              key={`word-${wordIdx}`}
              className={`typewriter-word ${word.className || 'text-neutral-800'}`}
              style={{
                animationDelay: `${wordIdx * 0.2}s`,
              }}
            >
              {word.text.split('').map((char, charIdx) => {
                const el = (
                  <span
                    key={`char-${charIdx}`}
                    className="typewriter-char"
                    style={{ animationDelay: `${charDelay * 0.03}s` }}
                  >
                    {char}
                  </span>
                );
                charDelay++;
                return el;
              })}
               
            </div>
          );
          return wordElement;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap justify-center my-2">
      <style>{styles}</style>
      {isVisible && renderWords()}
    </div>
  );
};