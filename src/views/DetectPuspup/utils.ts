function findAngle(p1, p2, refPt = [0, 0]) {
  const p1Ref = [p1[0] - refPt[0], p1[1] - refPt[1]];
  const p2Ref = [p2[0] - refPt[0], p2[1] - refPt[1]];

  const cosTheta =
    (p1Ref[0] * p2Ref[0] + p1Ref[1] * p2Ref[1]) /
    (Math.sqrt(p1Ref[0] ** 2 + p1Ref[1] ** 2) * Math.sqrt(p2Ref[0] ** 2 + p2Ref[1] ** 2));
  const theta = Math.acos(Math.max(-1.0, Math.min(cosTheta, 1.0)));
  const degree = Math.round((180 / Math.PI) * theta);

  return degree;
}
