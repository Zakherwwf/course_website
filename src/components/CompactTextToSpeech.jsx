// src/components/CompactTextToSpeech.jsx
// A compact version specifically designed for the sidebar
import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

export default function CompactTextToSpeech({ contentSelector = '.prose', className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pageText, setPageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      const englishVoice = availableVoices.findIndex(voice =>
        voice.lang.startsWith('en') && voice.localService
      );
      if (englishVoice !== -1) {
        setSelectedVoice(englishVoice);
      }
    };

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

    setTimeout(extractPageText, 500);

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [contentSelector, isSupported]);

  const extractAndCleanText = (element) => {
    const clone = element.cloneNode(true);

    const elementsToRemove = [
      '.text-to-speech',
      '.tts-container',
      'nav',
      'code',
      'pre',
      'script',
      'style',
      '.search-container',
      '.learning-objectives ol',
      '.quiz-container',
      '.chart-container canvas',
      'svg'
    ];

    elementsToRemove.forEach(selector => {
      const elements = clone.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    let text = clone.textContent || clone.innerText || '';

    return text
      .replace(/\s+/g, ' ')
      .replace(/\n{2,}/g, '. ')
      .replace(/([.!?])\s*([A-Z])/g, '$1 $2')
      .replace(/([a-z])([A-Z])/g, '$1. $2')
      .trim();
  };

  const speak = () => {
    if (!isSupported || !pageText) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pageText);

    if (voices[selectedVoice]) {
      utterance.voice = voices[selectedVoice];
    }
    utterance.rate = rate;
    utterance.pitch = 1;

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
    return null;
  }

  if (isLoading || !pageText) {
    return (
      <div className={`compact-tts loading ${className}`}>
        <div className="loading-content">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
        <style jsx>{`
          .compact-tts.loading {
            padding: 0.75rem;
            background-color: var(--color-bg-alt, #f9f9f9);
            border: 1px solid var(--color-border, #e8e8e8);
            border-radius: 8px;
            margin: 0;
          }
          .loading-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--color-text-muted, #777);
            font-size: 0.8rem;
            justify-content: center;
          }
          .spinner {
            width: 12px;
            height: 12px;
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

  const estimatedDuration = Math.ceil(pageText.length / (rate * 200));

  return (
    <div className={`compact-tts ${className}`}>
      {/* Header */}
      <div className="tts-header">
        <h4>🔊 Listen</h4>
        <span className="duration">~{estimatedDuration}min</span>
      </div>

      {/* Main Controls */}
      <div className="main-controls">
        <button
          onClick={speak}
          disabled={isPlaying}
          className="btn btn-primary"
          title="Play text-to-speech"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <polygon points="5,3 19,12 5,21" fill="currentColor"/>
          </svg>
          {isPlaying ? 'Playing' : 'Play'}
        </button>

        {isPlaying && (
          <div className="playback-controls">
            <button
              onClick={isPaused ? resume : pause}
              className="btn btn-small"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? '▶' : '⏸'}
            </button>

            <button
              onClick={stop}
              className="btn btn-small"
              title="Stop"
            >
              ⏹
            </button>
          </div>
        )}
      </div>

      {/* Quick Speed Control */}
      <div className="speed-control">
        <label>
          Speed:
          <select
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            disabled={isPlaying}
            className="speed-select"
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </label>
      </div>

      {/* Settings Toggle */}
      {voices.length > 0 && (
        <div className="settings-toggle">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="settings-btn"
            disabled={isPlaying}
          >
            ⚙️ {showSettings ? 'Hide' : 'Voice'}
          </button>
        </div>
      )}

      {/* Collapsible Settings */}
      {showSettings && voices.length > 0 && (
        <div className="voice-settings">
          <label>
            Voice:
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(Number(e.target.value))}
              disabled={isPlaying}
              className="voice-select"
            >
              {voices.map((voice, index) => (
                <option key={index} value={index}>
                  {voice.name.split(' ')[0]} ({voice.lang.split('-')[0]})
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <style jsx>{`
        .compact-tts {
          background: linear-gradient(135deg, var(--color-bg, white) 0%, var(--color-bg-alt, #f9f9f9) 100%);
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 8px;
          padding: 0.75rem;
          margin: 0;
          font-family: var(--font-sans, system-ui);
          font-size: 0.8rem;
        }

        .tts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--color-border, #e8e8e8);
        }

        .tts-header h4 {
          margin: 0;
          font-size: 0.85rem;
          color: var(--color-primary, #004c76);
          font-weight: 600;
        }

        .duration {
          font-size: 0.7rem;
          color: var(--color-text-muted, #777);
          background: var(--color-bg-alt, #f9f9f9);
          padding: 0.2rem 0.4rem;
          border-radius: 8px;
        }

        .main-controls {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .playback-controls {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: var(--color-primary, #004c76);
          color: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.75rem;
          width: 100%;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: var(--color-accent, #f39c12);
          transform: translateY(-1px);
        }

        .btn-small {
          background-color: var(--color-bg, white);
          color: var(--color-text, #333);
          border: 1px solid var(--color-border, #e8e8e8);
          padding: 0.25rem 0.5rem;
          font-size: 0.7rem;
          min-width: 30px;
        }

        .btn-small:hover:not(:disabled) {
          background-color: var(--color-bg-alt, #f9f9f9);
        }

        .speed-control {
          margin-bottom: 0.5rem;
        }

        .speed-control label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--color-text, #333);
        }

        .speed-select {
          padding: 0.2rem 0.4rem;
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 4px;
          font-size: 0.7rem;
          background: var(--color-bg, white);
          flex: 1;
        }

        .settings-toggle {
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .settings-btn {
          background: none;
          border: 1px solid var(--color-border, #e8e8e8);
          color: var(--color-text-muted, #777);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .settings-btn:hover:not(:disabled) {
          color: var(--color-primary, #004c76);
          border-color: var(--color-primary, #004c76);
        }

        .voice-settings {
          border-top: 1px solid var(--color-border, #e8e8e8);
          padding-top: 0.5rem;
        }

        .voice-settings label {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.7rem;
          color: var(--color-text, #333);
        }

        .voice-select {
          padding: 0.3rem;
          border: 1px solid var(--color-border, #e8e8e8);
          border-radius: 4px;
          font-size: 0.7rem;
          background: var(--color-bg, white);
        }

        .voice-select:disabled,
        .speed-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}