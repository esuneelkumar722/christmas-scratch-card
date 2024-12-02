// JavaScript to create the scratch card effect
const canvas = document.getElementById('scratch-card');
const ctx = canvas.getContext('2d');
const messageElement = document.getElementById('message');
const width = canvas.width = 300;
const height = canvas.height = 150;

// Draw the initial scratch card
function drawCard() {
    ctx.fillStyle = '#d1d1d1'; // Background color (silver)
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#9e9e9e'; // Scratchable layer color (gray)
    ctx.fillRect(0, 0, width, height);
}

// To track the mouse/touch position
let isScratching = false;

function startScratching(e) {
    isScratching = true;
    scratch(e);
}

function stopScratching() {
    isScratching = false;
}

function scratch(e) {
    if (!isScratching) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.clearRect(x - 15, y - 15, 30, 30); // Clear a small circle (to simulate scratching)

    // Check if enough of the card has been scratched to reveal the message
    if (checkScratchPercentage() > 40) {
        messageElement.style.display = 'block'; // Show the message
    }
}

// Calculate the percentage of the card scratched
function checkScratchPercentage() {
    const imageData = ctx.getImageData(0, 0, width, height);
    let scratchedPixels = 0;
    const totalPixels = width * height;

    for (let i = 0; i < totalPixels; i++) {
        if (imageData.data[i * 4 + 3] === 0) { // Check for transparency (scratched area)
            scratchedPixels++;
        }
    }

    return (scratchedPixels / totalPixels) * 100;
}

// Event listeners for mouse and touch events
canvas.addEventListener('mousedown', startScratching);
canvas.addEventListener('mousemove', scratch);
canvas.addEventListener('mouseup', stopScratching);
canvas.addEventListener('mouseleave', stopScratching);

// For mobile touch
canvas.addEventListener('touchstart', startScratching);
canvas.addEventListener('touchmove', scratch);
canvas.addEventListener('touchend', stopScratching);

// Initialize the card
drawCard();
