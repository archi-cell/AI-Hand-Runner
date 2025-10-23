# AI-Hand-Runner
🎮 Overview

AI Hand-Controlled Desert Runner is an interactive browser-based game that uses AI hand tracking to control a character using your webcam — no keyboard required!
Make a ✊ fist gesture in front of your webcam to make the soldier jump over fire obstacles in a desert environment.
Your high score is saved automatically using localStorage, and the game tracks your best performance.

🧠 Features

✅ AI Hand Detection (MediaPipe Hands) — Detects open hand vs. fist gestures in real-time using webcam input.
✅ Gesture-Based Control — Jump by simply making a fist (✊).
✅ Smooth Gameplay — JavaScript-powered canvas rendering.
✅ Persistent High Score — Stored using browser localStorage.
✅ Gaming UI — Modular desert background, soldier character, and fire obstacles.
✅ Fully Offline — Runs locally after one-time setup.

🧩 Technologies Used
Component	Technology
Frontend	HTML5, CSS3, JavaScript (ES6)
AI Detection	MediaPipe Hands

Video Capture	WebRTC (via browser webcam access)
Rendering	HTML5 Canvas API
Storage	Browser LocalStorage


2️⃣ Project Structure
📁 AI-Hand-Runner/
│
├── index.html        # Main game HTML file
├── style.css         # Game styling
├── script.js         # Main JavaScript (AI + game logic)
│
└── assets/
    ├── desert_bg.png # Background image
    ├── soldier.png   # Player image
    └── fire.png      # Obstacle image

3️⃣ Run the Game

Just open index.html in a browser (Chrome recommended).
✅ Allow webcam access when prompted.
✅ Wait for the camera to initialize.
✅ Make a ✊ fist to jump and avoid obstacles!

🕹️ Controls
Action	Gesture
Jump	✊ Make a Fist
Stay / Fall	🖐️ Open Hand
🧮 Scoring System

Each time you successfully jump over an obstacle, your score increases.

Your best score (high score) is saved locally even after reloading the game.

🧰 Future Improvements

🚀 Add background music and jump sound effects.
🎨 Add multiple levels and changing environments.
🧍 Add crouch gesture (e.g., ✌️ for duck).
🏆 Add leaderboard with backend (MongoDB + Node.js).
📱 Make it mobile-responsive using TensorFlow.js hand tracking.

🧑‍💻 Author

Farci Archi
Frontend Developer & AI Game Enthusiast 💡
🎯 Building interactive AI-based web experiences

📜 License

This project is open-source and available under the MIT License.
Feel free to use, modify, and enhance it with credit.
