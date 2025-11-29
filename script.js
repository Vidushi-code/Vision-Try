let selectedFrame = null;

// -------- FRAME SELECTION --------
document.querySelectorAll(".frame-thumb").forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove 'active' class from all buttons
        document.querySelectorAll(".frame-thumb").forEach(b =>
            b.classList.remove("active")
        );
        // Add 'active' class to the clicked button
        btn.classList.add("active");

        const img = btn.querySelector("img");
        // Get the full image path from the data-src attribute
        selectedFrame = img.getAttribute("data-src");
        
        // When a new frame is selected, immediately trigger a draw 
        // to update the canvas without waiting for the next camera frame.
        // This is necessary if the image is already cached.
        if (video.readyState >= 3) { // Check if video is playing
             // We can't directly call onResults, but we can call faceMesh.send
             // to process the current video frame again.
             faceMesh.send({ image: video }); 
        }
    });
});


// -------- CAMERA + CANVAS SETUP --------
const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

// Request camera access and set the video stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing the camera: ", err);
        alert("Could not access your camera. Please ensure you allow camera permissions.");
    });


// -------- DRAW GLASSES ON FACE (The Core Logic) --------
function onResults(results) {
    // Set canvas dimensions to match the video dimensions for accurate mapping
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // CRITICAL for stability: Always clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    // Stop processing and drawing if no face is detected OR no frame is selected
    if (!results.multiFaceLandmarks || !results.multiFaceLandmarks[0] || !selectedFrame) return;

    const lm = results.multiFaceLandmarks[0];

    // Use outer eye corners for frame positioning (landmarks 33 and 263)
    const leftEye = lm[33];   // Left eye outer corner
    const rightEye = lm[263]; // Right eye outer corner

    // Convert normalized coordinates to pixel coordinates
    const lx = leftEye.x * canvas.width;
    const ly = leftEye.y * canvas.height;
    const rx = rightEye.x * canvas.width;
    const ry = rightEye.y * canvas.height;

    // Calculate the distance between eyes
    const eyeDist = Math.hypot(rx - lx, ry - ly);
    
    // Frame should be wider than eye distance for realistic glasses
    // Increased multiplier for proper full-size glasses
    const frameWidth = eyeDist * 1.8;
    
    // Maintain proper aspect ratio for glasses frames
    const frameHeight = frameWidth * 0.8;

    // Center point between the eyes
    let midX = (lx + rx) / 2;
    let midY = (ly + ry) / 2;

    // Rotation angle based on eye alignment
    const angle = Math.atan2(ry - ly, rx - lx);    const img = new Image();
    img.src = selectedFrame;

    // Use a function for drawing logic to ensure it's executed regardless of image load state
    const drawFrame = () => {
        ctx.save();
        // 1. Translate the canvas origin to the center point (midX, midY)
        ctx.translate(midX, midY);
        // 2. Rotate the canvas
        ctx.rotate(angle);
        
        // 3. Draw the image, centered on the new translated and rotated origin
        // The draw position is calculated by subtracting half the width and half the height
        ctx.drawImage(img, -frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
        ctx.restore();
    };


    // Ensure image is loaded before drawing (important for first load)
    img.onload = drawFrame;
    
    // Safety check: If the image is already in the cache/loaded, draw it immediately.
    if (img.complete) {
        drawFrame();
    }
}


// -------- FACEMESH INIT --------
const faceMesh = new FaceMesh({
    locateFile: (file) => 
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
});

faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true, // Use refined landmarks for better eye placement
    minDetectionConfidence: 0.8,
    minTrackingConfidence: 0.8,
});

faceMesh.onResults(onResults);


// -------- CAMERA TO FACEMESH --------
const camera = new Camera(video, {
    // The onFrame callback is executed repeatedly for every video frame
    onFrame: async () => {
        // Send the current video frame to the FaceMesh pipeline for processing
        await faceMesh.send({ image: video });
    }
});

camera.start();

// FIX: The event listener block was incomplete/misplaced in the original script.
// This ensures the mobile navigation toggle works correctly when the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
  
    if (toggle && links) {
        toggle.addEventListener("click", () => {
            links.classList.toggle("open");
        });
    }
});