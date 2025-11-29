# Virtual Try-On Eyewear

A sophisticated real-time virtual try-on platform that enables users to preview eyewear frames using advanced AI-powered facial recognition technology. Built with MediaPipe Face Mesh and Flask, this application delivers an immersive and accurate try-on experience directly in the browser.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🌟 Features

### Core Functionality
- **Real-Time Face Tracking**: Utilizes MediaPipe Face Mesh for precise facial landmark detection
- **Live Frame Overlay**: Seamless overlay of eyewear frames that automatically adjust to facial movements
- **Background Removal**: Advanced OpenCV-based background removal for transparent frame rendering
- **Responsive Positioning**: Intelligent frame scaling and positioning based on eye distance and facial geometry
- **Smooth Animations**: EMA (Exponential Moving Average) smoothing for stable and natural frame tracking

### User Experience
- **Multiple Frame Selection**: Browse and switch between various eyewear styles instantly
- **Camera Controls**: Flip camera view for optimal positioning
- **Screenshot Capture**: Save your try-on results as PNG images
- **Cross-Browser Support**: Works on modern browsers without any plugin installation
- **Responsive Design**: Optimized for desktop and mobile devices

### Technical Highlights
- **Client-Side Processing**: Face detection runs directly in the browser for privacy
- **Server-Side Image Processing**: Flask backend handles complex background removal
- **CORS-Enabled API**: Secure cross-origin resource sharing
- **Classic UI/UX**: Elegant, modest design with smooth transitions and professional aesthetics

## 🛠️ Technology Stack

### Frontend
- **HTML5/CSS3**: Modern semantic markup with advanced CSS gradients and animations
- **JavaScript (ES6+)**: Asynchronous operations and DOM manipulation
- **MediaPipe Face Mesh**: Google's ML solution for facial landmark detection
- **Canvas API**: Real-time frame rendering and overlay composition

### Backend
- **Python 3.x**: Server-side scripting
- **Flask**: Lightweight WSGI web application framework
- **OpenCV**: Computer vision library for image processing
- **NumPy**: Numerical computing for efficient array operations
- **Pillow (PIL)**: Python Imaging Library for image manipulation
- **Flask-CORS**: Cross-Origin Resource Sharing support

## 📋 Prerequisites

- Python 3.7 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Webcam access
- Internet connection (for MediaPipe CDN resources)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/virtual-tryon-eyewear.git
cd virtual-tryon-eyewear
```

### 2. Install Python Dependencies
```bash
pip install flask flask-cors opencv-python numpy pillow
```

### 3. Project Structure
```
virtual-tryon-eyewear/
├── cv.py                 # Flask backend for background removal
├── index.html            # Main HTML structure
├── style.css             # Stylesheet with elegant design
├── script.js             # Frontend logic and MediaPipe integration
├── frame1.png            # Eyewear frame assets
├── frame2.png
├── frame3.png
├── ... (additional frames)
└── README.md             # Project documentation
```

## 🎯 Usage

### Starting the Application

1. **Start the Flask Backend**
   ```bash
   python cv.py
   ```
   The Flask server will start on `http://127.0.0.1:5000`

2. **Launch the Frontend**
   - Open `index.html` in a live server (e.g., VS Code Live Server)
   - Or access via `http://127.0.0.1:5500` (default Live Server port)

3. **Grant Camera Permissions**
   - Allow browser access to your webcam when prompted

### Using the Virtual Try-On

1. **Select a Frame**: Click on any frame thumbnail from the sidebar
2. **Position Your Face**: Center your face in the camera preview
3. **Remove Background** (Optional): Click "Make Selected Transparent" to remove white backgrounds from frames
4. **Adjust View**: Use the "Flip Camera" button if needed
5. **Capture**: Click "Capture Screenshot" to save your try-on image

## 🔧 Configuration

### Adjusting Frame Positioning

Edit `script.js` to customize frame behavior:

```javascript
const SMA_ALPHA = 0.25;              // Smoothing factor (0-1)
const DEFAULT_SCALE = 2.5;            // Frame width multiplier
const FRAME_VERTICAL_OFFSET = -0.15;  // Vertical position adjustment
```

### Background Removal Tuning

Modify `cv.py` for different background removal sensitivity:

```python
def remove_white_background(pil_image, threshold=240, edge_blur=3):
    # threshold: 0-255 (higher = stricter white detection)
    # edge_blur: smoothing amount (0-10)
```

## 🏗️ Architecture

### Frontend Flow
1. User selects eyewear frame
2. Camera feed initializes via getUserMedia API
3. MediaPipe Face Mesh detects facial landmarks
4. JavaScript calculates frame position and rotation
5. Canvas overlay renders frame in real-time

### Backend Flow
1. Frontend sends frame image to Flask endpoint
2. Python converts image to NumPy array
3. OpenCV processes image (background removal)
4. Processed image encoded as base64 PNG
5. JSON response returned to frontend

### API Endpoints

#### POST `/process_frame`
Removes background from eyewear frame images.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `frame` (image file)

**Response:**
```json
{
  "imageBase64": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

## 🎨 Customization

### Adding New Frames
1. Add frame images to the project directory (PNG/JPG format)
2. Update `index.html` with new frame buttons:
   ```html
   <button class="frame-thumb" data-src="your-frame.png" data-scale="2.5">
     <img src="your-frame.png" alt="Frame Name">
   </button>
   ```

### Styling Modifications
- Edit `style.css` to customize colors, fonts, and animations
- Color scheme uses CSS custom properties for easy theming
- Primary accent: `#e6b366` (gold/bronze)

## 🔐 Privacy & Security

- **No Data Collection**: Camera feed processed locally in browser
- **No Server Storage**: Images not saved on backend
- **Session-Only Processing**: Background removal results cached in browser session
- **CORS Protection**: API restricted to authorized origins

## 🐛 Troubleshooting

### Camera Not Working
- Ensure browser has camera permissions
- Check if another application is using the camera
- Try refreshing the page

### Frames Not Appearing
- Verify Flask server is running on port 5000
- Check browser console for JavaScript errors
- Ensure frame image paths are correct

### Background Removal Fails
- Confirm Flask dependencies are installed
- Check server console for Python errors
- Verify image format is supported (PNG, JPG, AVIF)

## 📊 Performance Optimization

- Face mesh runs at ~30 FPS on modern hardware
- Canvas rendering optimized for 60 FPS
- EMA smoothing reduces jitter without lag
- Background removal processed on-demand (not real-time)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Google MediaPipe for facial landmark detection
- OpenCV community for computer vision tools
- Flask framework contributors
- Design inspiration from modern e-commerce platforms

## 📧 Contact

For questions, suggestions, or support:
- Email: support@virtualtryon.com
- GitHub Issues: [Project Issues](https://github.com/yourusername/virtual-tryon-eyewear/issues)

---

**Made with ❤️ for better online eyewear shopping experiences**
