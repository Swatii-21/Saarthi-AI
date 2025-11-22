import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import uvicorn
import tempfile

# Point FFmpeg for Whisper
os.environ["FFMPEG_BINARY"] = r"./ffmpeg.exe"

app = FastAPI(title="SaarthiAI Whisper API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper Model Only Once
model = whisper.load_model("tiny")  # fast for weak laptops

@app.get("/")
def home():
    return {"message": "Whisper API Running!"}

@app.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    # Create temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
        temp_audio.write(await audio.read())
        temp_path = temp_audio.name

    # Whisper STT
    result = model.transcribe(temp_path)

    return {"text": result.get("text", "No text recognized")}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
