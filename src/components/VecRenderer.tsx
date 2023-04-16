import type { Vec2 } from "@/abstractClasses";
import {
  Matrix as MatrixImplemented,
  Vec2 as Vec2Implemented,
  radiansToDegrees,
} from "@/implementedClasses";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useCode } from "./Editor";

export type Sketch = (
  classes: { Vec2: any; Matrix: any },
  mousePosition: { x: number; y: number }
) => (Vec2 | string)[];

const vecToString = (vec: Vec2) => `${vec.x},${vec.y}`;

const SIZE = 1;
const Renderer = ({ data }: { data: (Vec2 | string)[] }) => {
  const centerX = SIZE / 2;
  const centerY = SIZE / 2;

  const vecs = data.filter((v) => v.hasOwnProperty("x")) as Vec2[];
  const labels = data.filter((v) => typeof v === "string") as string[];

  return (
    <svg className="w-full aspect-square" viewBox="0 0 500 500">
      <line
        x1={0}
        y1={`${centerY * 100}%`}
        x2={`${(centerX + SIZE / 2) * 100}%`}
        y2={`${centerY * 100}%`}
        className="stroke-slate-950 stroke-2"
      />

      <line
        x1={`${centerX * 100}%`}
        y1={0}
        x2={`${centerX * 100}%`}
        y2={`${(centerY + SIZE / 2) * 100}%`}
        className="stroke-slate-950 stroke-2"
      />

      {vecs.map((vec2, i) => {
        const vecClone = new Vec2Implemented(vec2.x, vec2.y);
        return (
          <Fragment key={i}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x={`calc(${(centerX + vec2.x / 2) * 100}% - 20px)`}
              y={`calc(${(centerY + vec2.y / 2) * 100}% - 20px)`}
            >
              <polygon
                points="30,20 10,10 10,30"
                transform={`rotate(${radiansToDegrees(
                  vecClone.direction()
                )} 20 20)`}
                fill={vec2.color ?? "black"}
              />
            </svg>
            <line
              x1={`${centerX * 100}%`}
              y1={`${centerY * 100}%`}
              x2={`${(centerX + vec2.x / 2) * 100}%`}
              y2={`${(centerY + vec2.y / 2) * 100}%`}
              strokeWidth={3}
              stroke={vec2.color ?? "black"}
            />
          </Fragment>
        );
      })}

      {labels.reverse().map((label, i) => {
        return (
          <text key={i} x="5%" y={`${95 - 5 * i}%`} className="fill-white">
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export function VecRenderer({ sketch }: { sketch: Sketch }) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const ref = useRef<HTMLDivElement>(null);

  const code = useCode();

  const correct = useMemo(() => {
    try {
      const s1 = sketch(code, mousePos)
        .map((v) => {
          if (v.hasOwnProperty("x") && v.hasOwnProperty("y")) {
            return vecToString(v as Vec2);
          }
          return v;
        })
        .join("");
      const s2 = sketch({ Vec2: Vec2Implemented, Matrix: MatrixImplemented }, mousePos)
        .map((v) => {
          if (v.hasOwnProperty("x") && v.hasOwnProperty("y")) {
            return vecToString(v as Vec2);
          }
          return v;
        })
        .join("");
      return s1 === s2;
    } catch (e) {}
    return false;
  }, [code, sketch, mousePos]);

  const result = useMemo(() => {
    try {
      return sketch(code, mousePos);
    } catch (e) {
      return [];
    }
  }, [code, sketch, mousePos]);

  // Use and effect to tracks mouse position within ref
  useEffect(() => {
    const elm = ref.current;
    if (elm) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = elm.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const xPercent = (x / width) * 2 - 1;
        const yPercent = (y / height) * 2 - 1;
        setMousePos({ x: xPercent, y: yPercent });
      };
      elm.addEventListener("mousemove", handleMouseMove);
      return () => {
        elm.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-800" ref={ref}>
      {!correct && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-700/70 text-white px-3 py-2 rounded-md backdrop-blur-sm">
          Incorrect
        </div>
      )}
      <Renderer data={result} />
      {correct && (
        <BsFillCheckCircleFill className="absolute bottom-2 right-2 text-lg text-emerald-500" />
      )}
    </div>
  );
}
