import type { PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { PoseLandmarker, DrawingUtils } from '@mediapipe/tasks-vision';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import { createPoseLandmarker, DetectSquat } from '@/views/DetectPuspup/DetectPose';
import Timer from '@/views/DetectPuspup/StopWatch';
import { completeActivity } from '@/api/dailyActivitiesTask';

export default function WorkoutCounter() {
  const location = useLocation();
  const workout = location.state?.workout;

  const onFinishWorkout = (e) => {
    console.log('WorkoutCounter finish', e);
    completeActivity(123, e.times ,e.completeReps).then((r) => {
      console.log(r);
    });
  };
  return (
    <div>
      {/*<Alert*/}
      {/*  message="Success Text"*/}
      {/*  type="success"*/}
      {/*  onClick={() => onFinishWorkout({ time: '2222', completeReps: 3 })}*/}
      {/*/>*/}
      <DetectPose workout={workout} handleWorkoutDone={onFinishWorkout} />
    </div>
  );
}

function DetectPose({ workout, handleWorkoutDone }) {
  const [localStream, setSocalStream] = useState<MediaStream>();
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [poseLandmark, setPoseLandmark] = useState<PoseLandmarker>();
  const [runningMode, setRunningMode] = useState<'VIDEO' | 'IMAGE'>('VIDEO');
  const [squatCount, setSquatCount] = useState(0);
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
      setSocalStream(stream);
    });
  }

  function stopWebCam() {
    localStream?.getVideoTracks()[0].stop();
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
          // squatCount++;
          setSquatCount((prevState) => prevState + 1);
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
    stopWebCam();
    canvasMask?.clearRect(0, 0, canvasElement.width, canvasElement.height);
    setPoseLandmark(undefined);
  }

  async function startPredict() {
    return createPoseLandmarker(runningMode)
      .then((newPoseLandmarker) => setPoseLandmark(newPoseLandmarker))
      .then(() => {
        setWebcamRunning(true);
        setSquatCount(0);
        enableWebCam(video);
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
        <div id="demos" className="flex">
          <div className=" ">
            <Timer
              title={workout.title}
              reps={squatCount}
              repsGoal={3}
              startPreDict={startPredict}
              resetPredict={() => {
                stopPredict(video, canvasCtx);
              }}
              onFinishWorkout={(time: any) => {
                stopPredict(video, canvasCtx); // stop predict
                handleWorkoutDone({ ...time, completeReps: squatCount });
                // notify success workout
                // call api finish activity task.
                // BE will update activity task done.
                // navigate Home
              }}
            />
          </div>

          <div id="liveView" className="videoView">
            {/*// temporary hidden */}
            {/*<button*/}
            {/*  id="webcamButton"*/}
            {/*  className="mdc-button mdc-button--raised"*/}
            {/*  onClick={startPredict}*/}
            {/*>*/}
            {/*  <span className="mdc-button__label">*/}
            {/*    {webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE PREDICTIONS'}*/}
            {/*  </span>*/}
            {/*</button>*/}
            {/*<button*/}
            {/*  id="webcamButton"*/}
            {/*  className="mdc-button mdc-button--raised"*/}
            {/*  onClick={() => {*/}
            {/*    stopPredict(video, canvasCtx);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Stop PREDICTIONS*/}
            {/*</button>*/}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
