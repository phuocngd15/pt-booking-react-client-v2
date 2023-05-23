import { useEffect, useState } from 'react';
import type { PoseLandmarker } from '@mediapipe/tasks-vision';
import ImageUploader from '@/views/DetectPuspup/UploadImage';
import imageTestSquat1 from '@/views/DetectPuspup/Squat-1.jpg';
import { createPoseLandmarker, DetectSquat } from '@/views/DetectPuspup/DetectPose';

export default function DetectPoseOfImage() {
  const [poseLandmark, setPoseLandmark] = useState<PoseLandmarker>();
  const [runningMode, setRunningMode] = useState<'VIDEO' | 'IMAGE'>('VIDEO');
  useEffect(() => {
    (async () => {
      const poseLandmark = await createPoseLandmarker(runningMode);
      setPoseLandmark(poseLandmark);
    })();
    return () => {};
  }, []);
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
    <>
      <img src={imageTestSquat1} onClick={(e) => detectImage(e)} />
      <ImageUploader onClickImg={detectImage} />
    </>
  );
}
