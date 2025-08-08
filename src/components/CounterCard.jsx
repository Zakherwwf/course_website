import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { CountUp } from 'countup.js';

export default function CounterCard({ endValue, prefix = '', suffix = '', label, duration = 2.5 }) {
  const numRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const countUp = new CountUp(numRef.current, endValue, {
            duration: duration,
            prefix: prefix,
            suffix: suffix,
            useGrouping: true,
            separator: ',',
          });
          if (!countUp.error) {
            countUp.start();
            observer.disconnect(); // Animate only once
          } else {
            console.error(countUp.error);
          }
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [endValue, prefix, suffix, duration]);

  return (
    <div class="stat-card" ref={cardRef}>
        <div class="value" ref={numRef}>0</div>
        <div class="label">{label}</div>
        <style>{`
            .stat-card {
                background-color: transparent; /* Remove background */
                border-radius: 0;
                padding: 1.5rem 0;
                border: none;
                border-bottom: 1px solid var(--color-border); /* Simple separator line */
                text-align: left;
            }
            .value {
                font-family: var(--font-sans);
                font-size: 2.75rem;
                font-weight: 700;
                color: var(--color-primary); /* Panda Red for the number */
                line-height: 1.1;
            }
            .label {
                font-family: var(--font-sans);
                font-size: 1rem;
                color: var(--color-text); /* Black for the label */
                margin-top: 0.5rem;
            }
        `}</style>
    </div>
  );
}