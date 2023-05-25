import { FilesetResolver, PoseLandmarker } from '@mediapipe/tasks-vision';

export const createPoseLandmarker = async (runningMode: 'VIDEO' | 'IMAGE') => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
  );
  return await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
      delegate: 'CPU',
    },
    minTrackingConfidence: 0.7,
    minPoseDetectionConfidence: 0.7,
    minPosePresenceConfidence: 0.7,
    runningMode: runningMode,
    numPoses: 1,
  });
  // demosSection.classList.remove("invisible");
};
export function angleBetweenThreePoints(p1, p2, p3) {
  // p1 = [p1.x, p1.y];
  // p2 = [p2.x, p2.y];
  // p3 = [p3.x, p3.y];
  const radians =
    Math.atan2(p3[1] - p2[1], p3[0] - p2[0]) - Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) {
    angle = 360 - angle;
  }
  return angle;
}

export function detect_squat(cL, cR, dL, dR) {
  if (cL < 130 && cR < 130 && dL < 130 && dR < 130) {
    return true;
  } else {
    return false;
  }
}

export function hand_gesture(aL, aR, bL, bR) {
  if (aL > 130 && aR > 130 && bL < 120 && bR < 120 && bL > 30 && bR > 30) {
    //Hand Gesture: True
    return true;
  } else {
    return false;
  }
}

const kp = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
};

export function DetectSquat(landmarks): [number, number, number, number, boolean, boolean] {
  // Get coordinates and angle (Left Elbow angle)
  if (!landmarks || !landmarks[11] || !landmarks[12] || !landmarks[13] || !landmarks[14])
    return [0, 0, 0, 0, false, false];

  const ALp1 = [landmarks[kp.LEFT_SHOULDER].x, landmarks[kp.LEFT_SHOULDER].y];
  const ALp2 = [landmarks[kp.LEFT_ELBOW].x, landmarks[kp.LEFT_ELBOW].y];
  const ALp3 = [landmarks[kp.LEFT_WRIST].x, landmarks[kp.LEFT_WRIST].y];
  const AL = angleBetweenThreePoints(ALp1, ALp2, ALp3);

  // Get coordinates and angle (Right Elbow angle)
  const ARp1 = [landmarks[kp.RIGHT_SHOULDER].x, landmarks[kp.RIGHT_SHOULDER].y];
  const ARp2 = [landmarks[kp.RIGHT_ELBOW].x, landmarks[kp.RIGHT_ELBOW].y];
  const ARp3 = [landmarks[kp.RIGHT_WRIST].x, landmarks[kp.RIGHT_WRIST].y];
  const AR = angleBetweenThreePoints(ARp1, ARp2, ARp3);

  // Get coordinates and angle(Left Shoulder angle)
  const BLp1 = [landmarks[kp.LEFT_HIP].x, landmarks[kp.LEFT_HIP].y];
  const BLp2 = [landmarks[kp.LEFT_SHOULDER].x, landmarks[kp.LEFT_SHOULDER].y];
  const BLp3 = [landmarks[kp.LEFT_ELBOW].x, landmarks[kp.LEFT_ELBOW].y];
  const BL = angleBetweenThreePoints(BLp1, BLp2, BLp3);

  // Get coordinates (Right Shoulder angle)
  const BRp1 = [landmarks[kp.RIGHT_HIP].x, landmarks[kp.RIGHT_HIP].y];
  const BRp2 = [landmarks[kp.RIGHT_SHOULDER].x, landmarks[kp.RIGHT_SHOULDER].y];
  const BRp3 = [landmarks[kp.RIGHT_ELBOW].x, landmarks[kp.RIGHT_ELBOW].y];
  const BR = angleBetweenThreePoints(BRp1, BRp2, BRp3);

  // Get coordinates and angle (Left Hip angle)
  const CLp1 = [landmarks[kp.LEFT_SHOULDER].x, landmarks[kp.LEFT_SHOULDER].y];
  const CLp2 = [landmarks[kp.LEFT_HIP].x, landmarks[kp.LEFT_HIP].y];
  const CLp3 = [landmarks[kp.LEFT_KNEE].x, landmarks[kp.LEFT_KNEE].y];
  const LEFT_SHOULDER_HIP_KNEE = angleBetweenThreePoints(CLp1, CLp2, CLp3);

  // Get coordinates and angle (Right Hip angle)
  const CRp1 = [landmarks[kp.RIGHT_SHOULDER].x, landmarks[kp.RIGHT_SHOULDER].y];
  const CRp2 = [landmarks[kp.RIGHT_HIP].x, landmarks[kp.RIGHT_HIP].y];
  const CRp3 = [landmarks[kp.RIGHT_KNEE].x, landmarks[kp.RIGHT_KNEE].y];
  const CR_SHOULDER_HIP_KNEE = angleBetweenThreePoints(CRp1, CRp2, CRp3);

  // Get coordinates and angle (Left Knee angle)
  const DLp1 = [landmarks[kp.LEFT_HIP].x, landmarks[kp.LEFT_HIP].y];
  const DLp2 = [landmarks[kp.LEFT_KNEE].x, landmarks[kp.LEFT_KNEE].y];
  const DLp3 = [landmarks[kp.LEFT_ANKLE].x, landmarks[kp.LEFT_ANKLE].y];
  const DL = angleBetweenThreePoints(DLp1, DLp2, DLp3);

  // Get coordinates and angle (Right Knee angle)
  const DRp1 = [landmarks[kp.RIGHT_HIP].x, landmarks[kp.RIGHT_HIP].y];
  const DRp2 = [landmarks[kp.RIGHT_KNEE].x, landmarks[kp.RIGHT_KNEE].y];
  const DRp3 = [landmarks[kp.RIGHT_ANKLE].x, landmarks[kp.RIGHT_ANKLE].y];
  const DR = angleBetweenThreePoints(DRp1, DRp2, DRp3);

  // Squat Detection
  const isQuat = detect_squat(LEFT_SHOULDER_HIP_KNEE, CR_SHOULDER_HIP_KNEE, DL, DR);
  // Hand Gesture
  const isGoodHand = hand_gesture(AL, AR, BL, BR);

  return [LEFT_SHOULDER_HIP_KNEE, CR_SHOULDER_HIP_KNEE, DL, DR, isQuat, isGoodHand];
}
