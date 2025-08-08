import { useEffect, useRef } from 'preact/hooks';

export default function BackgroundBeams() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Topography-style paths configuration
    const paths = [
      {
        amplitude: 30,
        frequency: 0.008,
        speed: 0.02,
        offset: 0,
        color: 'rgba(0, 76, 118, 0.15)', // Primary color
        strokeWidth: 2
      },
      {
        amplitude: 40,
        frequency: 0.012,
        speed: 0.015,
        offset: Math.PI / 3,
        color: 'rgba(0, 76, 118, 0.1)',
        strokeWidth: 1.5
      },
      {
        amplitude: 25,
        frequency: 0.006,
        speed: 0.025,
        offset: Math.PI / 2,
        color: 'rgba(243, 156, 18, 0.12)', // Accent color
        strokeWidth: 2.5
      },
      {
        amplitude: 35,
        frequency: 0.01,
        speed: 0.018,
        offset: Math.PI,
        color: 'rgba(0, 76, 118, 0.08)',
        strokeWidth: 1
      },
      {
        amplitude: 20,
        frequency: 0.014,
        speed: 0.03,
        offset: Math.PI * 1.5,
        color: 'rgba(243, 156, 18, 0.08)',
        strokeWidth: 1.5
      },
      {
        amplitude: 45,
        frequency: 0.005,
        speed: 0.012,
        offset: Math.PI / 4,
        color: 'rgba(0, 76, 118, 0.06)',
        strokeWidth: 3
      }
    ];

    // Floating particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(0, 76, 118, 0.3)' : 'rgba(243, 156, 18, 0.3)'
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016; // Roughly 60fps

      // Draw topography-style flowing paths
      paths.forEach((path, pathIndex) => {
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.strokeWidth;
        ctx.lineCap = 'round';

        // Create multiple horizontal waves at different heights
        const numWaves = 8;
        for (let waveIndex = 0; waveIndex < numWaves; waveIndex++) {
          const baseY = (canvas.height / (numWaves + 1)) * (waveIndex + 1);
          const waveOffset = path.offset + waveIndex * Math.PI / 4;

          ctx.beginPath();
          for (let x = -100; x <= canvas.width + 100; x += 2) {
            const y = baseY +
                     path.amplitude * Math.sin(x * path.frequency + time * path.speed + waveOffset) +
                     path.amplitude * 0.3 * Math.sin(x * path.frequency * 2.5 + time * path.speed * 1.5 + waveOffset) +
                     path.amplitude * 0.15 * Math.sin(x * path.frequency * 4 + time * path.speed * 2 + waveOffset);

            if (x === -100) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      });

      // Draw and animate particles
      particles.forEach(particle => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulse opacity
        particle.opacity = 0.2 + 0.3 * Math.sin(time * 2 + particle.x * 0.01);

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/0\.\d+\)/, `${particle.opacity})`);
        ctx.fill();

        // Add subtle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        const glowOpacity = particle.opacity * 0.1;
        ctx.fillStyle = particle.color.replace(/0\.\d+\)/, `${glowOpacity})`);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      }}
    />
  );
}