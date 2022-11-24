/// helper functions

export function line_dist(x1,y1, x2,y2){
  return Math.hypot(x2-x1, y2-y1);
}

export function angle_between_points(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1); 
}