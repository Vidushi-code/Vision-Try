import cv2
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post("/apply_frame")
def apply_frame():
    file = request.files["image"]
    frame_path = request.form["frame"]

    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_UNCHANGED)
    frame = cv2.imread(frame_path, cv2.IMREAD_UNCHANGED)

    h, w = img.shape[:2]
    frame = cv2.resize(frame, (w, int(h * 0.4)))

    overlay_y = int(h * 0.28)
    overlay_x = int((w - frame.shape[1]) / 2)

    for c in range(0, 3):
        img[overlay_y:overlay_y+frame.shape[0], overlay_x:overlay_x+frame.shape[1], c] = \
            frame[:, :, c] * (frame[:, :, 3]/255.0) + \
            img[overlay_y:overlay_y+frame.shape[0], overlay_x:overlay_x+frame.shape[1], c] * (1.0 - frame[:, :, 3]/255.0)

    _, buffer = cv2.imencode(".jpg", img)
    return buffer.tobytes()

if __name__ == "__main__":
    app.run(debug=True)

