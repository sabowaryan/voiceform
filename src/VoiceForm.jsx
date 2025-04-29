import React, { useState, useEffect, useRef } from 'react';
import './VoiceForm.css';

/**
 * VoiceForm Component
 * 
 * This component creates a form that can be filled using voice input.
 * It uses the Web Speech API to capture and process voice commands.
 */
const VoiceForm = () => {
  // State for tracking if voice recording is active
  const [isListening, setIsListening] = useState(false);
  
  // State to store form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // State to track which field is currently selected
  const [currentField, setCurrentField] = useState('');
  
  // State to store the speech recognition instance
  const [recognition, setRecognition] = useState(null);
  
  // State for feedback messages
  const [feedback, setFeedback] = useState({ show: false, message: '', type: '' });
  
  // State to track form submission status
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, submitting, success
  
  // Ref to store the current active field persistently across renders
  // This solves the issue where voice input might go to the wrong field
  const recognitionRef = useRef(null);

  // Initialize speech recognition on component mount
  useEffect(() => {
    // Check if the browser supports speech recognition
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      // Configure recognition settings
      recognitionInstance.continuous = false; // Stop after user stops speaking
      recognitionInstance.interimResults = false; // Only return final results
      recognitionInstance.lang = 'en-US'; // Set language to English
 
      // Handle recognition results
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Only update the field if we have a valid reference
        if (recognitionRef.current) {
          setFormData(prev => ({
            ...prev,
            [recognitionRef.current]: transcript
          }));
          showFeedback(`Text recognized: "${transcript}"`, 'success');
        }
      };

      // Handle recognition end event
      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      // Handle recognition errors
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        showFeedback('Speech recognition error. Please try again.', 'error');
      };

      // Store the recognition instance in state
      setRecognition(recognitionInstance);
    } else {
      // Show error if browser doesn't support speech recognition
      showFeedback('Speech recognition is not supported by your browser.', 'error');
    }
  }, []);

  /**
   * Display a feedback message to the user
   * @param {string} message - Message to display
   * @param {string} type - Type of message (success, error, info)
   */
  const showFeedback = (message, type) => {
    setFeedback({ show: true, message, type });
    // Auto-hide the message after 3 seconds
    setTimeout(() => {
      setFeedback({ show: false, message: '', type: '' });
    }, 3000);
  };

  /**
   * Start voice recognition for a specific field
   * @param {string} field - The form field to target (name, email, message)
   */
  const startListening = (field) => {
    if (recognition) {
      // Stop recognition if it's already running
      if (isListening) {
        recognition.stop();
      }
      
      // Update both the state and the persistent ref with the current field
      setCurrentField(field);
      recognitionRef.current = field;
      
      // Small delay to ensure the state is updated
      setTimeout(() => {
        setIsListening(true);
        recognition.start();
        showFeedback(`Listening for the "${field}" field...`, 'info');
      }, 100);
    }
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name.trim()) {
      showFeedback('Please enter your name', 'error');
      return;
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      showFeedback('Please enter a valid email address', 'error');
      return;
    }
    
    if (!formData.message.trim()) {
      showFeedback('Please enter a message', 'error');
      return;
    }

    // Update status to show loading
    setSubmitStatus('submitting');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      console.log('Form data:', formData);
      showFeedback('Form submitted successfully!', 'success');
      setSubmitStatus('success');
      
      // Reset the form after displaying success
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 2000);
    }, 1500);
  };

  /**
   * Get an icon for each field type
   * @param {string} field - The form field name
   * @returns {string} - Emoji icon for the field
   */
  const getFieldIcon = (field) => {
    switch(field) {
      case 'name':
        return '👤';
      case 'email':
        return '✉️';
      case 'message':
        return '💬';
      default:
        return '';
    }
  };

  /**
   * Get a display label for each field
   * @param {string} field - The form field name
   * @returns {string} - User-friendly label
   */
  const getFieldLabel = (field) => {
    switch(field) {
      case 'name':
        return 'Name';
      case 'email':
        return 'Email';
      case 'message':
        return 'Message';
      default:
        return field.charAt(0).toUpperCase() + field.slice(1);
    }
  };

  // Render the form
  return (
    <div className="voice-form-container">
      {/* Feedback message popup */}
      {feedback.show && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
      
      <h1>Voice Form</h1>
      <p className="form-description">
        Fill out this form using your voice by clicking the 🎤 button
      </p>
      
      <form onSubmit={handleSubmit} className="voice-form">
        {/* Generate form fields dynamically */}
        {['name', 'email', 'message'].map((field) => (
          <div className="form-group" key={field}>
            <label>{getFieldIcon(field)} {getFieldLabel(field)}</label>
            <div className="input-group">
              {/* Render input or textarea based on field type */}
              {field !== 'message' ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={formData[field]}
                  onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                  placeholder={`Say your ${field}`}
                  disabled={submitStatus === 'submitting'}
                  onClick={() => setCurrentField(field)}
                />
              ) : (
                <textarea
                  value={formData[field]}
                  onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                  placeholder={`Say your ${field}`}
                  disabled={submitStatus === 'submitting'}
                  onClick={() => setCurrentField(field)}
                />
              )}
              {/* Voice input button */}
              <button
                type="button"
                className={`mic-button ${isListening && currentField === field ? 'active' : ''}`}
                onClick={() => startListening(field)}
                disabled={submitStatus === 'submitting'}
                title="Click to speak"
                data-field={field}
              >
                {isListening && currentField === field ? '🔴' : '🎤'}
              </button>
            </div>
            {/* Visual indicator for active recording */}
            {isListening && currentField === field && (
              <div className="recording-indicator">
                Recording in progress for "{field}"...
              </div>
            )}
          </div>
        ))}

        {/* Submit button with different states */}
        <button 
          type="submit" 
          className={`submit-button ${submitStatus === 'submitting' ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
          disabled={submitStatus !== 'idle'}
        >
          {submitStatus === 'idle' && 'Submit'}
          {submitStatus === 'submitting' && 'Sending...'}
          {submitStatus === 'success' && '✓ Sent!'}
        </button>
      </form>
    </div>
  );
};

export default VoiceForm; 