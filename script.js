const homeScreen = document.getElementById("home-screen");
const gameScreen = document.getElementById("game-screen");
const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreSpan = document.getElementById("score");
const video = document.getElementById("webcam");
const gameVideo = document.getElementById("game-webcam");
const fistStatus = document.getElementById("fist-status");

// 🟢 Added high score display element
const highScoreSpan = document.getElementById("highscore");

let player, obstacle, gravity, isJumping, gameOver, score, highScore;
let fistClosed = false;
let cameraStarted = false;

// Load images
const playerImg = new Image();
playerImg.src = "assets/soldier.png";
const fireImg = new Image();
fireImg.src = "assets/fire.png";

// 🟢 Load or initialize high score from localStorage
highScore = localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore"))
    : 0;
if (highScoreSpan) highScoreSpan.textContent = highScore;

// Setup MediaPipe Hands
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
});
hands.onResults(onResults);

// Initialize Camera
const camera = new Camera(video, {
    onFrame: async () => {
        await hands.send({ image: video });
    },
    width: 640,
    height: 480,
});

camera.start().then(() => {
    console.log("✅ Webcam started");
    cameraStarted = true;
});

// Fist Detection Logic
function onResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];
        const thumbTip = hand[4];
        const indexTip = hand[8];
        const middleTip = hand[12];
        const ringTip = hand[16];
        const pinkyTip = hand[20];

        const avgDist =
            (distance(thumbTip, indexTip) +
                distance(indexTip, middleTip) +
                distance(middleTip, ringTip) +
                distance(ringTip, pinkyTip)) / 4;

        fistClosed = avgDist < 0.12;

        if (fistClosed) {
            fistStatus.textContent = "✊ Fist Detected";
            fistStatus.style.color = "#00ff66";
        } else {
            fistStatus.textContent = "🖐️ Open Hand";
            fistStatus.style.color = "orange";
        }
    } else {
        fistClosed = false;
        fistStatus.textContent = "❌ No Hand Detected";
        fistStatus.style.color = "red";
    }
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

// Start game on button click
startBtn.addEventListener("click", () => {
    if (!cameraStarted) {
        alert("Please allow webcam access first!");
        return;
    }
    gameVideo.srcObject = video.srcObject || null;
    startGame();
});

function startGame() {
    homeScreen.style.display = "none";
    gameScreen.style.display = "block";

    player = { x: 100, y: 300, width: 60, height: 60, dy: 0 };
    obstacle = { x: 800, y: 320, width: 60, height: 60, speed: 6 };
    gravity = 0.8;
    isJumping = false;
    gameOver = false;
    score = 0;

    scoreSpan.textContent = score;
    update();
}

function jump() {
    if (!isJumping) {
        player.dy = -16;
        isJumping = true;
    }
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fist triggers jump
    if (fistClosed) jump();

    // Player physics
    player.y += player.dy;
    player.dy += gravity;
    if (player.y > 300) {
        player.y = 300;
        player.dy = 0;
        isJumping = false;
    }

    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // Obstacle movement
    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = 800 + Math.random() * 200;
        score++;
        scoreSpan.textContent = score;

        // 🟢 Update high score
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            if (highScoreSpan) highScoreSpan.textContent = highScore;
        }
    }

    ctx.drawImage(fireImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Collision detection
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        gameOver = true;
        ctx.font = "40px Poppins";
        ctx.fillStyle = "red";
        ctx.fillText("🔥 GAME OVER 🔥", 270, 200);
        ctx.fillStyle = "white";
        ctx.font = "20px Poppins";
        ctx.fillText(`Score: ${score}`, 370, 240);
        ctx.fillText(`High Score: ${highScore}`, 340, 270);
        setTimeout(() => window.location.reload(), 2500);
    }

    requestAnimationFrame(update);
}
