import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  // useScroll listens to the scroll position of the target element (ref)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Start tracking when the top of the element hits the top of the viewport
  });

  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Measure the height of the content to set the SVG height
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use Framer Motion hooks to create a smooth "spring" animation for the gradient
  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={`relative w-full max-w-4xl mx-auto h-full ${className}`}>
      {/* The decorative line and dot */}
      <div className="absolute top-0 -left-4 md:-left-8 h-full">
        <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
          {/* The static, grey background path */}
          <motion.path
            d={`M 1 0V -36 l 18 -2 V ${svgHeight * 0.8} l -18 2 V ${svgHeight}`}
            fill="none"
            stroke="#E8E8E8" /* Light gray border color */
            strokeWidth="2"
          />
          {/* The animated, colored gradient path */}
          <motion.path
            d={`M 1 0V -36 l 18 -2 V ${svgHeight * 0.8} l -18 2 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="motion-reduce:hidden"
          />
          <defs>
            {/* The gradient definition that animates based on scroll position */}
            <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
              <stop stop-color="#004c76" stop-opacity="0" />
              <stop stop-color="#004c76" />
              <stop offset="0.325" stop-color="#00629b" />
              <stop offset="1" stop-color="#f39c12" stop-opacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};