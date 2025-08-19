// src/components/AutoTextToSpeech.jsx
// This component automatically extracts text from the page content
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function AutoTextToSpeech({ contentSelector = '.prose', className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [pageText, setPageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported('speechSynthesis' in window);

    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Try to find a good default voice (English)
      const englishVoice = availableVoices.findIndex(voice =>
        voice.lang.startsWith('en') && voice.localService
      );
      if (englishVoice !== -1) {
        setSelectedVoice(englishVoice);
      }
    };

    // Extract text from page content
    const extractPageText = () => {
      const contentElement = document.querySelector(contentSelector);
      if (contentElement) {
        const text = extractAndCleanText(contentElement);
        setPageText(text);
      }
      setIsLoading(false);
    };

    if (isSupported) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Wait a bit for the page to fully render
    setTimeout(extractPageText, 500);

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [contentSelector, isSupported]);

  const extractAndCleanText = (element) => {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);

    // Remove elements we don't want to read
    const elementsToRemove = [
      '.text-to-speech',
      '.tts-container',
      'nav',
      '.navigation',
      'code',
      'pre',
      '.code-block',
      'script',
      'style',
      '.search-container',
      '.learning-objectives ol', // Don't read the objectives list
      '.quiz-container',
      '.chart-container canvas', // Don't read chart elements
      'svg'
    ];

    elementsToRemove.forEach(selector => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Get the text content
    let text = clone.textContent || clone.innerText || '';

    // Clean up the text
    return text
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/\n{2,}/g, '. ') // Replace multiple newlines with periods
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2') // Ensure spacing after sentences
      .replace(/([a-z])([A-Z])/g, '$1. $2') // Add periods between sections
      .trim();
  };

  const speak = () => {
    if (!isSupported || !pageText) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(pageText);

    // Configure voice settings
    if (voices[selectedVoice]) {
      utterance.voice = voices[selectedVoice];
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null; // Don't show anything if not supported
  }

  if (isLoading || !pageText) {
    return (
      <div className={`text-to-speech loading ${className}`}>
        <div className="loading-content">
          <div className="spinner"></div>
          <span>Loading audio...</span>
        </div>
        <style jsx>{`
          .text-to-speech.loading {
            padding: 1rem;
            background-color: var(--color-bg-alt, #f9f9f9);
            border: 1px solid var(--color-border, #e8e8e8);
            border-radius: 12px;
            margin: 1rem 0;
          }
          .loading-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--color-text-muted, #777);
            font-size: 0.9rem;
          }
          .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid var(--color-primary, #004c76);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const estimatedDuration = Math.ceil(pageText.length / (rate * 200)); // Rough estimate: 200 chars per minute

  return (
    <div className={`text-to-speech ${className}`}>
      <div className="tts-header">
        <div className="tts-info">
          <h4>🔊 Listen to this page</h4>
          <span className="duration-estimate">
            ~{estimatedDuration} minute{estimatedDuration !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Main Controls */}
      <div className="controls-main">
        <button
          onClick={speak}
          disabled={isPlaying}
          className="btn btn-primary"
          title="Play text-to-speech"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
          {isPlaying ? 'Playing...' : 'Listen'}
        </button>

        {isPlaying && (
          <>
            <button
              onClick={isPaused ? resume : pause}
              className="btn btn-secondary"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                  <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                </svg>
              )}
            </button>

            <button
              onClick={stop}
              className="btn btn-secondary"
              title="Stop"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" fill="currentColor"/>
              </svg>
            </button>
          </>
        )}

        {/* Quick Settings */}
        <div className="quick-settings">
          <label>
            Speed:
            <select
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              disabled={isPlaying}
              className="speed-select"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </label>
        </div>
      </div>

      {/* Advanced Controls (collapsible) */}
      <details className="advanced-controls">
        <summary>Voice Settings</summary>

        <div className="settings-grid">
          {voices.length > 0 && (
            <div className="setting">
              <label htmlFor="voice-select">Voice:</label>
              <select
                id="voice-select"
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(Number(e.target.value))}
                disabled={isPlaying}
              >
                {voices.map((voice, index) => (
                  <option key={index} value={index}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="setting">
            <label htmlFor="pitch-slider">Pitch: {pitch}</label>
            <input
              id="pitch-slider"
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={(e) => setPitch(Number(e.target.value))}
              disabled={isPlaying}
            />
          </div>
        </div>
      </details>

      <style jsx>{`
        .text-to-speech {
          background: linear-gradient(135deg, var(--color-bg, white) 0%, var(--color-bg-alt, #f9f9f9) 100%);
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 12px;
          padding: 1rem;
          margin: 1rem 0;
          font-family: var(--font-sans, system-ui);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .tts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--color-border, #e8e8e8);
        }

        .tts-info h4 {
          margin: 0;
          font-size: 1rem;
          color: var(--color-primary, #004c76);
          font-weight: 600;
        }

        .duration-estimate {
          font-size: 0.8rem;
          color: var(--color-text-muted, #777);
          background: var(--color-bg-alt, #f9f9f9);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
        }

        .controls-main {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: var(--color-primary, #004c76);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-accent, #f39c12);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .btn-secondary {
          background-color: var(--color-bg, white);
          color: var(--color-text, #333);
          border: 1px solid var(--color-border, #e8e8e8);
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: var(--color-bg-alt, #f9f9f9);
          transform: translateY(-1px);
        }

        .quick-settings {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
        }

        .quick-settings label {
          font-size: 0.85rem;
          color: var(--color-text, #333);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .speed-select {
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 4px;
          font-size: 0.85rem;
          background: var(--color-bg, white);
        }

        .speed-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .advanced-controls {
          border-top: 1px solid var(--color-border, #e8e8e8);
          padding-top: 1rem;
        }

        .advanced-controls summary {
          cursor: pointer;
          font-weight: 600;
          color: var(--color-primary, #004c76);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .advanced-controls summary:hover {
          color: var(--color-accent, #f39c12);
        }

        .settings-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .setting {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .setting label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-text, #333);
        }

        .setting select,
        .setting input[type="range"] {
          padding: 0.5rem;
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 4px;
          font-family: inherit;
          background: var(--color-bg, white);
        }

        .setting select:disabled,
        .setting input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .controls-main {
            flex-direction: column;
            align-items: stretch;
          }
          
          .quick-settings {
            margin-left: 0;
            justify-content: center;
          }
          
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}