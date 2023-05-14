// @ts-expect-error
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { useRef, useState, useEffect } from 'react';

const demosSection = document.getElementById('demos');
let poseLandmarker: PoseLandmarker;
let runningMode = 'IMAGE';

const createPoseLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
  );
  poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: 'CPU',
    },
    runningMode: runningMode,
    numPoses: 2,
  });
  // demosSection.classList.remove("invisible");
};

export default function DetectPose() {
  const [webcamRunning, setWebcamRunning] = useState(false);
  createPoseLandmarker();
  const videoHeight = '360px';
  const videoWidth = '480px';
  const video: HTMLElement | null = document.getElementById('webcam');
  const canvasElement = document.getElementById('output_canvas') as HTMLCanvasElement;
  const canvasCtx = canvasElement?.getContext('2d');
  const drawingUtils = new DrawingUtils(canvasCtx);

  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  // If webcam supported, add event listener to button for when user wants to activate it.
  if (!hasGetUserMedia()) {
    console.warn('getUserMedia() is not supported by your browser');
    return <div>Detect function is not supported by your browser</div>;
  }

  // Enable the live webcam view and start detection.
  function enableWC() {
    if (webcamRunning) return;
    if (!video) return;
    if (!poseLandmarker) {
      console.log('Wait! poseLandmaker not loaded yet.');
      return;
    }

    setWebcamRunning(true);

    // getUsermedia parameters.
    const constraints = {
      video: true,
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      // video.addEventListener('loadeddata', predictWebcam);
    });
  }

  let lastVideoTime = -1;
  async function predictWebcam() {
    canvasElement.style.height = videoHeight;
    video.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    video.style.width = videoWidth;
    // Now let's start detecting the stream.
    if (runningMode === 'IMAGE') {
      runningMode = 'VIDEO';
      await poseLandmarker.setOptions({ runningMode: 'VIDEO' });
    }
    const startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime) {
      lastVideoTime = video.currentTime;
      poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        for (const landmark of result.landmarks) {
          drawingUtils.drawLandmarks(landmark, {
            radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          });
          drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
        }
        canvasCtx.restore();
      });
    }

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  function stopPredict() {
    setWebcamRunning(false);
  }
  return (
    <div>
      <link
        href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
        rel="stylesheet"
      />
      <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" />
      <div>
        <h1>Pose detection using the MediaPipe PoseLandmarker task</h1>

        <div id="demos">
          <h2>Demo: Webcam continuous pose landmarks detection</h2>
          <p>
            Stand in front of your webcam to get real-time pose landmarker detection.Click{' '}
            <b>enable webcam</b> below and grant access to the webcam if prompted.
          </p>

          <div id="liveView" className="videoView">
            <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableWC}>
              <span className="mdc-button__ripple" />
              <span className="mdc-button__label">
                {webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE PREDICTIONS'}
              </span>
            </button>
            <button
              id="webcamButton"
              className="mdc-button mdc-button--raised"
              onClick={stopPredict}
            >
              Stop PREDICTIONS
            </button>
            <div style={{ position: 'relative' }}>
              <video
                id="webcam"
                style={{ width: '1280px', height: '720px', position: 'relative' }}
                autoPlay={true}
                onLoadedData={predictWebcam}
              />
              <canvas
                className="output_canvas"
                id="output_canvas"
                width="1280"
                height="720"
                style={{ position: 'absolute', left: '0px', top: '0px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
