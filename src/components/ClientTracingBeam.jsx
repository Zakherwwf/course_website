import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

// Define a placeholder to prevent layout shift
const TracingBeamPlaceholder = () => (
  <div style={{ minHeight: '100vh' }}>{/* Simple placeholder */}</div>
);

export default function ClientTracingBeam({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [TracingBeamComponent, setTracingBeamComponent] = useState(null);

  useEffect(() => {
    // This effect only runs on the client
    setIsClient(true);
    // Dynamically import the component that causes issues
    import('./TracingBeam.jsx').then(module => {
      setTracingBeamComponent(() => module.TracingBeam); // Store the component itself in state
    });
  }, []);

  // On the server, or before the component has loaded, show the placeholder.
  if (!isClient || !TracingBeamComponent) {
    return <TracingBeamPlaceholder />;
  }

  // Once loaded on the client, render the real TracingBeam with its children
  return <TracingBeamComponent>{children}</TracingBeamComponent>;
}