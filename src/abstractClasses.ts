export abstract class Vec2 {
  abstract x: number;
  abstract y: number;
  abstract color: string;

  abstract add(v: Vec2): Vec2;
  abstract subtract(v: Vec2): Vec2;
  abstract dot(v: Vec2): number;

  abstract direction(): number;

  // Other vector operations...
}

export abstract class Matrix {
  abstract createIdentity(): Matrix;
  abstract createScaling(sx: number, sy: number): Matrix;
  abstract createRotation(angle: number): Matrix;

  abstract createReflectionX(): Matrix;
  abstract createReflectionY(): Matrix;

  abstract elements: number[][];
  abstract multiplyVec2(vec: Vec2): Vec2;

  // Helper functions from previous examples...
}