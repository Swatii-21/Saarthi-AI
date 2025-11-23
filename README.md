# SaarthiAI

SaarthiAI is an offline, multilingual, voice-enabled emergency and awareness assistant designed especially for rural and low-literacy users.
It provides step-by-step guidance, speech input, speech output, and a warm, friendly, accessible UI — all fully available without internet.

## Features

- 🌐 **Multilingual Support**: Available in 10 languages (English, Hindi, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali, Punjabi, Malayalam)
- 📱 **Mobile-First Design**: Responsive, touch-friendly interface optimized for mobile devices
- 🎤 **Voice Interaction**: Speech-to-text and text-to-speech support
- 🔌 **Offline-First**: Works completely offline with local AI responses
- ♿ **Accessibility**: High contrast mode, adjustable font sizes, voice-only mode, and full screen reader support
- 🎨 **Warm & Empathetic UI**: Soft colors, rounded cards, large icons, and friendly design

## Screens

1. **Splash Screen**: Initial loading screen
2. **Onboarding**: Introduction to the app
3. **Language Selection**: Choose from 10 supported languages
4. **Home**: Category grid (Health, First Aid, Fire Safety, Disaster Help, Awareness)
5. **Category Interaction**: Speak or type your question
6. **Voice Listening**: Real-time voice input
7. **AI Result**: Step-by-step guidance with audio playback
8. **Settings**: Accessibility and language preferences
9. **Sync Status**: Offline sync information

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Technology Stack

- React 18
- React Router DOM
- CSS3 with CSS Variables
- Web Speech API (for voice features)
- LocalStorage (for offline data persistence)

## Project Structure

```
saarthi-ai/
├── backend/
│   ├── app.py                 # Main FastAPI/Flask app
│   ├── requirements.txt       # Backend dependencies
│   ├── models/                # Offline AI models
│   ├── database/              # Local DB / JSON storage
│   ├── utils/                 # Helper functions
│   ├── routes/                # API routes
│   └── services/              # Core logic (NLP, TTS, STT)
│
├── public/
│   ├── index.html
│   └── manifest.json
│
├── src/
│   ├── components/            # Reusable UI components
│   ├── context/               # React Context providers
│   ├── screens/               # App screens
│   ├── translations/          # Language JSON files
│   ├── utils/                 # Utility functions
│   ├── App.js                 # Main app component
│   └── index.js               # Entry point
│
└── package.json

```

## Accessibility Features

- Adjustable font sizes (Small, Medium, Large, Extra Large)
- High contrast mode
- Voice-only mode
- Large touch targets (minimum 44x44px)
- Full ARIA labels and screen reader support
- Keyboard navigation support

## Browser Support

- Chrome/Edge (recommended for voice features)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Voice features require browser support for Web Speech API.

## License

MIT

## 🖥️ Backend Setup
### Install Backend Dependencies(Only One Time)
```bash
pip install fastapi
pip install uvicorn[standard]
pip install python-multipart
pip install aiofiles
pip install whisper

```

### Activate Virtual Environment
```bash
venv\Scripts\activate
set PATH=D:\download_material\ffmpeg-8.0.1-essentials_build\ffmpeg-8.0.1-essentials_build\bin;%PATH%
ffmpeg -version
python server.py
```



