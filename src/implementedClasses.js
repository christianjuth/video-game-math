
export class Vec2 {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  add(v) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }

  subtract(v) {
    return new Vec2(this.x - v.x, this.y - v.y);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  direction() {
    return Math.atan2(this.y, this.x);
  }

  // Other vector operations...
}

export class Matrix {
  static createIdentity() {
    return new Matrix([
      [1, 0],
      [0, 1]
    ]);
  }

  static createScaling(sx, sy) {
    return new Matrix([
      [sx,  0],
      [ 0, sy]
    ]);
  }

  static createRotation(angle) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
    return new Matrix([
      [ cosTheta, -sinTheta],
      [ sinTheta,  cosTheta]
    ]);
  }

  static createReflectionX() {
    return new Matrix([
      [ 1,  0],
      [ 0, -1]
    ]);
  }

  static createReflectionY() {
    return new Matrix([
      [-1,  0],
      [ 0,  1]
    ]);
  }

  
  constructor(elements) {
    this.elements = elements;
  }

  multiplyVec2(vec) {
    const x = this.elements[0][0] * vec.x + this.elements[0][1] * vec.y;
    const y = this.elements[1][0] * vec.x + this.elements[1][1] * vec.y;
    return new Vec2(x, y);
  }

  // Helper functions from previous examples...
}

export function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}