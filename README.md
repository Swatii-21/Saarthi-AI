# Saarthi AI

**Saarthi AI** is an offline, multilingual, voice-enabled emergency and awareness assistant designed especially for rural and low-literacy users. It provides step-by-step guidance, speech input, speech output, and a warm, friendly, accessible UI — all fully available without internet.

## Features

- 🌐 **Multilingual Support**: Available in 10 languages (English, Hindi, Marathi, Telugu, Tamil, Kannada, Gujarati, Bengali, Punjabi, Malayalam)
- 📱 **Mobile-First Design**: Responsive, touch-friendly interface optimized for mobile devices
- 🎤 **Voice Interaction**: Speech-to-text (using Whisper AI) and text-to-speech support
- 🔌 **Offline-First**: Works completely offline with local AI responses
- ♿ **Accessibility**: High contrast mode, adjustable font sizes, voice-only mode, and full screen reader support
- 🎨 **Warm & Empathetic UI**: Soft colors, rounded cards, large icons, and friendly design
- 🚨 **Emergency Categories**: Health, First Aid, Fire Safety, Disaster Help, and Awareness

## Screens

1. **Splash Screen**: Initial loading screen
2. **Onboarding**: Introduction to the app
3. **Language Selection**: Choose from 10 supported languages
4. **Home**: Category grid (Health, First Aid, Fire Safety, Disaster Help, Awareness)
5. **Category Interaction**: Speak or type your question
6. **Voice Listening**: Real-time voice input with Whisper transcription
7. **AI Result**: Step-by-step guidance with audio playback
8. **Settings**: Accessibility and language preferences
9. **Sync Status**: Offline sync information

## Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router DOM** - Navigation
- **CSS3** with CSS Variables - Styling
- **Web Speech API** - Text-to-speech
- **LocalStorage** - Offline data persistence

### Backend
- **FastAPI** - Python web framework
- **Whisper** - OpenAI's speech-to-text model
- **Uvicorn** - ASGI server
- **FFmpeg** - Audio processing

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip**
- **FFmpeg** (for audio processing)

## Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd Saarthi-AI
```

2. Install dependencies:
```bash
npm install
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install fastapi
pip install uvicorn[standard]
pip install python-multipart
pip install aiofiles
pip install openai-whisper
```

**Note**: You can also install from `requirements.txt` if available:
```bash
pip install -r requirements.txt
```

4. Install FFmpeg:
   - **Windows**: Download from [FFmpeg website](https://ffmpeg.org/download.html) and add to PATH, or place `ffmpeg.exe` in the backend directory
   - **macOS**: `brew install ffmpeg`
   - **Linux**: `sudo apt-get install ffmpeg` or `sudo yum install ffmpeg`

## Running the Application

### Start Backend Server

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate virtual environment (if using):
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Set FFmpeg path (if needed):
```bash
# Windows - if ffmpeg.exe is in backend directory
set PATH=D:\path\to\ffmpeg\bin;%PATH%

# macOS/Linux - usually already in PATH
```

4. Run the server:
```bash
python server.py
```

The backend API will be available at `http://localhost:8000`

### Start Frontend Application

1. In a new terminal, navigate to the project root:
```bash
cd Saarthi-AI
```

2. Start the React development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Building for Production

### Frontend Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## 📁 Project Structure

```
Saarthi-AI/
├── backend/
│   ├── server.py              # FastAPI server with Whisper integration
│   ├── requirements.txt       # Python dependencies
│   └── temp_voice.webm        # Temporary audio file storage
│
├── public/
│   ├── index.html            # HTML template
│   └── manifest.json         # PWA manifest
│
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Modal.js
│   │   └── Toggle.js
│   │
│   ├── context/              # React Context providers
│   │   ├── AppContext.js     # App-wide state
│   │   └── LanguageContext.js # Language preferences
│   │
│   ├── screens/              # App screens
│   │   ├── Splash.js
│   │   ├── Onboarding.js
│   │   ├── LanguageSelection.js
│   │   ├── Home.js
│   │   ├── CategoryInteraction.js
│   │   ├── VoiceListening.js
│   │   ├── AIResult.js
│   │   ├── Settings.js
│   │   └── SyncStatus.js
│   │
│   ├── translations/         # Language JSON files
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── mr.json
│   │   ├── te.json
│   │   ├── ta.json
│   │   ├── kn.json
│   │   ├── gu.json
│   │   ├── bn.json
│   │   ├── pa.json
│   │   └── ml.json
│   │
│   ├── utils/                # Utility functions
│   │   ├── aiUtils.js        # Offline AI responses
│   │   └── voiceUtils.js     # Voice recording and TTS
│   │
│   ├── App.js                # Main app component
│   ├── AppWrapper.js         # App wrapper with context
│   ├── App.css               # Global styles
│   ├── index.js              # Entry point
│   └── index.css             # Base styles
│
├── package.json              # Frontend dependencies
└── README.md                 # This file
```

## API Endpoints

### Backend API (FastAPI)

- `GET /` - Health check endpoint
  - Returns: `{"message": "Whisper API Running!"}`

- `POST /transcribe` - Speech-to-text transcription
  - **Request**: Multipart form data with `audio` file (webm format)
  - **Response**: `{"text": "transcribed text"}`
  - **Example**:
    ```bash
    curl -X POST "http://localhost:8000/transcribe" \
      -F "audio=@voice.webm"
    ```

## Configuration

### Backend Configuration

In `backend/server.py`, you can configure:

- **Whisper Model**: Change `whisper.load_model("tiny")` to `"base"`, `"small"`, `"medium"`, or `"large"` for better accuracy (requires more resources)
- **CORS Origins**: Update `allow_origins` in CORS middleware if deploying to different domains
- **Port**: Change port in `uvicorn.run(app, host="0.0.0.0", port=8000)`
- **FFmpeg Path**: Update `os.environ["FFMPEG_BINARY"]` if FFmpeg is in a custom location

### Frontend Configuration

- **Backend URL**: Update the API URL in `src/utils/voiceUtils.js` if backend is on a different host/port
- **Language Support**: Add new languages by creating JSON files in `src/translations/`
- **Offline Responses**: Extend offline AI responses in `src/utils/aiUtils.js`

## Accessibility Features

- **Adjustable Font Sizes**: Small, Medium, Large, Extra Large
- **High Contrast Mode**: Enhanced visibility for low vision users
- **Voice-Only Mode**: Complete navigation via voice commands
- **Large Touch Targets**: Minimum 44x44px for easy interaction
- **Full ARIA Labels**: Screen reader support throughout
- **Keyboard Navigation**: Full keyboard accessibility
- **Text-to-Speech**: All content can be read aloud

## Browser Support

- **Chrome/Edge** (recommended for voice features)
- **Firefox**
- **Safari**
- **Mobile browsers** (iOS Safari, Chrome Mobile)

**Note**: Voice features require browser support for:
- Web Speech API (for text-to-speech)
- MediaRecorder API (for voice recording)
- getUserMedia API (for microphone access)

## Troubleshooting

### Backend Issues

1. **FFmpeg not found**:
   - Ensure FFmpeg is installed and in PATH
   - Or update `FFMPEG_BINARY` in `server.py`

2. **Whisper model download fails**:
   - Check internet connection (required for first-time model download)
   - Models are cached after first download

3. **Port 8000 already in use**:
   - Change port in `server.py` or stop the process using port 8000

### Frontend Issues

1. **Voice recording not working**:
   - Ensure microphone permissions are granted
   - Check browser console for errors
   - Verify backend is running on `http://localhost:8000`

2. **CORS errors**:
   - Ensure backend CORS middleware allows `http://localhost:3000`
   - Check backend is running

3. **Text-to-speech not working**:
   - Check browser support for Web Speech API
   - Try a different browser (Chrome recommended)

## Development Notes

- The app uses offline-first architecture with predefined responses
- Whisper model is loaded once at server startup for efficiency
- Audio files are temporarily stored during transcription
- All translations are stored in JSON files for easy updates
- LocalStorage is used for persisting user preferences
 
## License

MIT

**Made with ❤️ for rural and low-literacy communities**
