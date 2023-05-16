import type { PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { PoseLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import { useState, useEffect } from 'react';
import { countBy } from 'lodash-es';
import imageTestSquat1 from './Squat-1.jpg';
import { createPoseLandmarker, DetectSquat } from '@/views/DetectPuspup/DetectPose';
import ImageUploader from '@/views/DetectPuspup/UploadImage';
// let poseLandmarker: PoseLandmarker;

const MIN_HIP_ANGLE = 100; // Minimum angle for hip flexion
const MAX_KNEE_ANGLE = 150; // Maximum angle for knee flexion
let squatCount = 0;
// let isSquatting = false;

function calculateAngle(point1, point2, point3) {
  const vec1 = [point1.x - point2.x, point1.y - point2.y];
  const vec2 = [point3.x - point2.x, point3.y - point2.y];

  const dotProduct = vec1[0] * vec2[0] + vec1[1] * vec2[1];
  const mag1 = Math.sqrt(vec1[0] ** 2 + vec1[1] ** 2);
  const mag2 = Math.sqrt(vec2[0] ** 2 + vec2[1] ** 2);

  return Math.acos(dotProduct / (mag1 * mag2)) * (180 / Math.PI);
}
function detectSquats(poseLandmarks) {
  if (
    !poseLandmarks ||
    !poseLandmarks[11] ||
    !poseLandmarks[12] ||
    !poseLandmarks[13] ||
    !poseLandmarks[14]
  )
    return;
  const leftHip = poseLandmarks[11];
  const rightHip = poseLandmarks[12];
  const leftKnee = poseLandmarks[13];
  const rightKnee = poseLandmarks[14];

  // Calculate the angles at the hips and knees
  const hipAngle = calculateAngle(leftHip, rightHip, leftKnee);
  const kneeAngle = calculateAngle(leftKnee, rightKnee, leftHip);

  if (hipAngle > MIN_HIP_ANGLE && kneeAngle < MAX_KNEE_ANGLE) {
    if (!isSquatting) {
      isSquatting = true; // Start of a squat repetition
      squatCount++;
      console.log('squatCount', squatCount);
    }
  } else {
    isSquatting = false;
  }
}
export default function DetectPose() {
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [poseLandmark, setPoseLandmark] = useState<PoseLandmarker>();
  const [runningMode, setRunningMode] = useState<string>('VIDEO');

  useEffect(() => {
    (async () => {
      const poseLandmark = await createPoseLandmarker(runningMode);
      setPoseLandmark(poseLandmark);
    })();
    return () => {};
  }, []);

  const videoHeight = '360px';
  const videoWidth = '480px';
  const video: any = document.getElementById('webcam');
  const canvasElement = document.getElementById('output_canvas') as HTMLCanvasElement;
  const canvasCtx = canvasElement?.getContext('2d');
  const drawingUtils = canvasCtx ? new DrawingUtils(canvasCtx) : undefined;

  // Check if webcam access is supported.
  const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

  // If webcam supported, add event listener to button for when user wants to activate it.
  if (!hasGetUserMedia()) {
    console.warn('getUserMedia() is not supported by your browser');
    return <div>Detect function is not supported by your browser</div>;
  }

  // Enable the live webcam view and start detection.
  function enableWebCam(video: any) {
    // getUsermedia parameters.
    const constraints = {
      video: true,
    };
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  }

  let lastVideoTime = -1;
  let preLEFT_SHOULDER_HIP_KNEE = 0;
  let isSitting = 3;
  let isStandUp = 1;
  async function predictWebcam() {
    if (!webcamRunning) return;
    canvasElement.style.height = videoHeight;
    video.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    video.style.width = videoWidth;
    // Now let's start detecting the stream.
    const startTimeMs = performance.now();
    if (lastVideoTime !== video.currentTime && video.srcObject) {
      lastVideoTime = video.currentTime;

      poseLandmark?.detectForVideo(video, startTimeMs, (result: PoseLandmarkerResult) => {
        canvasCtx?.save();
        canvasCtx?.clearRect(0, 0, canvasElement.width, canvasElement.height);

        // detectSquats(result.landmarks[0]);
        //DetectSquat(result.landmarks[0]);
        const [LEFT_SHOULDER_HIP_KNEE, CR_SHOULDER_HIP_KNEE, DL, DR, isSquarting] = DetectSquat(
          result.landmarks[0],
        );

        if (
          135 < LEFT_SHOULDER_HIP_KNEE &&
          LEFT_SHOULDER_HIP_KNEE < 165 &&
          135 < DL &&
          DL < 165 &&
          135 < DR &&
          DR < 165 &&
          135 < CR_SHOULDER_HIP_KNEE &&
          CR_SHOULDER_HIP_KNEE < 165 &&
          isStandUp === 1 &&
          isSitting === 3
        ) {
          const bigger = preLEFT_SHOULDER_HIP_KNEE > LEFT_SHOULDER_HIP_KNEE;
          if (bigger) {
            isSitting = 2;
            console.log('is sitting: isStandUp isSitting', isStandUp, isSitting);
          }

          setTimeout(() => {
            preLEFT_SHOULDER_HIP_KNEE = LEFT_SHOULDER_HIP_KNEE;
          }, 200);
        }
        if (isSitting === 2 && isSquarting) {
          isSitting = 1;
          isStandUp = 2;
          console.log(' squating: isStandUp, isSitting', isStandUp, isSitting);
        }
        if (
          LEFT_SHOULDER_HIP_KNEE < 180 &&
          LEFT_SHOULDER_HIP_KNEE > 130 &&
          DL < 180 &&
          DL > 130 &&
          DR < 180 &&
          DR > 130 &&
          CR_SHOULDER_HIP_KNEE < 180 &&
          CR_SHOULDER_HIP_KNEE > 130 &&
          isSitting === 1 &&
          isStandUp === 2
        ) {
          isStandUp = 3;
          console.log('isStandUp, isSitting', isStandUp, isSitting);
          setTimeout(() => {
            preLEFT_SHOULDER_HIP_KNEE = LEFT_SHOULDER_HIP_KNEE;
          }, 200);
        }

        if (
          isStandUp === 3 &&
          isSitting === 1 &&
          LEFT_SHOULDER_HIP_KNEE !== 0 &&
          CR_SHOULDER_HIP_KNEE !== 0
        ) {
          isStandUp = 1;
          isSitting = 3;
          squatCount++;
          console.log('squatCount', squatCount);
        }

        for (const landmark of result.landmarks) {
          drawingUtils?.drawLandmarks(landmark, {
            radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
          });
          drawingUtils?.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
        }
        canvasCtx?.restore();
      });
    }

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  function stopPredict(videoElment: any, canvasMask: any) {
    setWebcamRunning(false);
    videoElment.srcObject = null;
    canvasMask?.clearRect(0, 0, canvasElement.width, canvasElement.height);
    setPoseLandmark(undefined);
  }
  async function detectImage(e) {
    if (runningMode === 'VIDEO') {
      setRunningMode('IMAGE');
      await poseLandmark?.setOptions({ runningMode: 'IMAGE' });
    }
    poseLandmark?.detect(e.target, (result) => {
      // const canvas = document.createElement('canvas');
      // canvas.setAttribute('class', 'canvas');
      // canvas.setAttribute('width', e.target.naturalWidth + 'px');
      // canvas.setAttribute('height', e.target.naturalHeight + 'px');
      // canvas.style =
      //   'left: 0px;' +
      //   'top: 0px;' +
      //   'width: ' +
      //   e.target.width +
      //   'px;' +
      //   'height: ' +
      //   e.target.height +
      //   'px;';
      //
      // e.target.parentNode.appendChild(canvas);
      // const canvasCtx = canvas.getContext('2d');
      //const drawingUtils = new DrawingUtils(canvasCtx);
      DetectSquat(result.landmarks[0]);
      // for (const landmark of result.landmarks) {
      //   drawingUtils.drawLandmarks(landmark, {
      //     radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
      //   });
      //   drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
      // }
    });
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
            <button
              id="webcamButton"
              className="mdc-button mdc-button--raised"
              onClick={async () => {
                createPoseLandmarker(runningMode)
                  .then((newPoseLandmarker) => setPoseLandmark(newPoseLandmarker))
                  .then(() => {
                    setWebcamRunning(true);
                    squatCount = 0;
                    enableWebCam(video);
                  });
              }}
            >
              <span className="mdc-button__ripple" />
              <span className="mdc-button__label">
                {webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE PREDICTIONS'}
              </span>
            </button>
            <button
              id="webcamButton"
              className="mdc-button mdc-button--raised"
              onClick={() => {
                stopPredict(video, canvasCtx);
              }}
            >
              Stop PREDICTIONS
            </button>
            <div style={{ position: 'relative', alignItems: 'center' }}>
              <video
                id="webcam"
                style={{ width: videoWidth, height: videoHeight, position: 'relative' }}
                autoPlay={true}
                onLoadedData={() => {
                  setTimeout(predictWebcam, 2000);
                }}
              />
              <canvas
                className="output_canvas"
                id="output_canvas"
                width="1280"
                height="720"
                style={{ position: 'absolute', left: '0px', top: '0px' }}
              />
              <img src={imageTestSquat1} onClick={(e) => detectImage(e)} />
              <ImageUploader onClickImg={detectImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
