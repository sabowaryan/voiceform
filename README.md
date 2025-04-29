# Voice Form

![Voice Form Logo](https://img.shields.io/badge/Voice%20Form-React-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A modern, responsive voice-controlled form built with React that allows users to input information using speech recognition.

## 🎤 Features

- **Voice Input**: Fill out form fields using speech recognition
- **Modern UI**: Clean, responsive design with animations and visual feedback
- **Real-time Feedback**: Visual cues during voice recording
- **Form Validation**: Basic validation for all fields
- **Cross-Browser Support**: Works best in Chrome and other browsers that support the Web Speech API

## 📋 Screenshot

![Voice Form Screenshot](/public/images/voiceform-screenshot.png)

## 🚀 Getting Started

### Prerequisites

- Node.js (v19 or newer)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sabowaryan/voiceform.git
cd voice-form
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🌐 Deployment

This project is configured for automatic deployment to GitHub Pages. You can visit the live demo at:

[https://sabowaryan.github.io/voiceform](https://sabowaryan.github.io/voiceform)

### Manual Deployment

If you want to deploy manually:

1. Make sure all your changes are committed and pushed
2. Run:
```bash
npm run deploy
```

### Continuous Deployment

The project uses GitHub Actions for continuous deployment:
- Every push to the `main` branch automatically triggers a build and deploy to GitHub Pages
- The workflow file is located at `.github/workflows/deploy.yml`

## 💻 Usage

1. Click on any field you want to fill in
2. Click the microphone button 🎤 next to the field
3. Speak clearly into your microphone
4. Your speech will be converted to text and entered into the field
5. Fill out all fields and click Submit

## 🔧 Technologies Used

- **React**: UI library for building the interface
- **Web Speech API**: For speech recognition functionality
- **CSS Variables**: For consistent styling and theming
- **Responsive Design**: Works on all devices and screen sizes

## 📊 Browser Compatibility

The application works best with browsers that support the Web Speech API:
- Chrome (recommended)
- Edge
- Safari (limited support)
- Firefox (limited support)

## 🔍 How It Works

The application uses the Web Speech API's SpeechRecognition interface to convert speech to text. When a user clicks the microphone button, the app starts listening for speech and converts it to text when the user stops speaking. The text is then entered into the selected field.

Key parts of the implementation:

```javascript
// Initialize speech recognition
const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Handle recognition results
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  // Update form field with transcript
};
```

## 📁 Project Structure

```
voice-form/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── ...
├── src/
│   ├── App.js             # Main app component
│   ├── App.css            # Global styles
│   ├── VoiceForm.jsx      # Voice-controlled form component
│   ├── VoiceForm.css      # Form styles
│   ├── index.js           # Entry point
│   └── index.css          # Base styles
└── package.json           # Dependencies and scripts
```

## 📝 Future Improvements

- Support for multiple languages
- Enhanced voice commands for navigating through the form
- Ability to edit text with voice commands
- Integration with backend APIs for form submission
- Voice feedback for user actions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

Created by [@SabowaRyan](https://x.com/SabowaRyan)

---

Feel free to contribute to this project by opening issues or submitting pull requests! 