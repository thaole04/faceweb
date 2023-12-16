from gtts import gTTS
import os
import subprocess

def speak(text):
    try:
        tts = gTTS(text=text, lang='vi')
        tts.save("voice.mp3")
        # use subprocess to play the voice.mp3 file, wait until it finishes
        subprocess.Popen(['mpg123', '-q', 'voice.mp3']).wait()
        # os.system("mpg123 voice.mp3")
        os.remove("voice.mp3")
    except:
        print("Error: cannot play the voice")

if __name__ == "__main__":
    speak("Xin chào tôi là Lê Ngọc Thao")
