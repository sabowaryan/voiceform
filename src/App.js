import React, { useState, useEffect } from 'react';
import VoiceForm from './VoiceForm';
import './App.css';

/**
 * App Component
 * 
 * Main application component that wraps the VoiceForm component
 * and provides the overall layout with header and footer.
 */
function App() {
  // State to manage the initial loading animation
  const [loading, setLoading] = useState(true);

  // Simulate loading process with a delay
  useEffect(() => {
    // Display loading animation for 1.2 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading animation
    }, 1200);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading overlay shown during initial load */}
      {loading && <div className="app-loading"></div>}
      
      <div className="app">
        {/* Application header */}
        <header className="app-header">
          <h1 style={{ 
            textAlign: 'center', 
            margin: '2rem 0',
            color: '#4361ee',
            fontSize: '2.5rem',
            fontWeight: '700'
          }}>
            <span role="img" aria-label="Microphone">🎙️</span> Voice Form
          </h1>
        </header>
        
        {/* Main content - VoiceForm component */}
        <main>
          <VoiceForm />
        </main>
        
        {/* Application footer */}
        <footer style={{ 
          textAlign: 'center', 
          margin: '2rem 0', 
          color: '#6c757d',
          fontSize: '0.9rem'
        }}>
          {/* Browser compatibility notice */}
          <p>Use Chrome for the best voice recognition experience</p>
          
          {/* Copyright information */}
          <p style={{ marginTop: '0.5rem' }}>© {new Date().getFullYear()} - Voice Form</p>
          
          {/* Creator attribution with X (Twitter) link */}
          <p style={{ 
            marginTop: '1rem',
            fontWeight: '500',
            color: '#4361ee'
          }}>
            Created by <a 
              href="https://x.com/SabowaRyan" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                color: '#4361ee',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* X (Twitter) logo SVG */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{marginBottom: '-2px'}}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              @SabowaRyan
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default App; 