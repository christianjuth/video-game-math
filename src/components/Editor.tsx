"use client";

import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import stripIndent from "strip-indent";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const Context = createContext<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}>({ code: "", setCode: () => {} });

const CODE = `
class Vec2 {
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

  // Other vector operations...
}

class Matrix {
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

`;

export function Editor({ className }: { className?: string }) {
  const context = useContext(Context);

  return (
    <div className={`bg-slate-950 rounded-lg font-medium text-sm ${className} flex flex-col`}>
      <span className="text-slate-500 p-4 block border-b border-b-slate-800/90">
        EDITOR
      </span>
      <div className="overflow-y-auto p-4">
        <CodeEditor
          value={context.code}
          language="js"
          placeholder="Please enter JS code."
          onChange={(evn) => context.setCode(evn.target.value)}
          padding={0}
          style={
            {
              fontSize: "inherit",
              backgroundColor: "unset",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              "--color-prettylights-syntax-sublimelinter-gutter-mark": "#eee",
              "--color-fg-default": "#fff",
            } as Record<string, string | number>
          }
          data-color-mode="dark"
        />
      </div>
    </div>
  );
}

export function CodeExample({ code }: { code: string }) {
  return (
    <div className="bg-slate-950 font-medium text-sm p-4">
      <CodeEditor
        value={stripIndent(code.replace(/(^\s*\n|\n\s*$)/g, ""))}
        language="js"
        readOnly
        padding={0}
        style={
          {
            fontSize: "inherit",
            backgroundColor: "unset",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            "--color-prettylights-syntax-sublimelinter-gutter-mark": "#eee",
            "--color-fg-default": "#fff",
          } as Record<string, string | number>
        }
        data-color-mode="dark"
      />
    </div>
  );
}

export function useCode() {
  const ctx = useContext(Context);

  const result = useMemo(() => {
    try {
      return new Function(`
        ${ctx.code}

        ;const output = {};
        if (typeof Vec2 !== 'undefined') {
          output.Vec2 = Vec2;
        }
        if (typeof Matrix !== 'undefined') {
          output.Matrix = Matrix;
        }
        return output
      `)();
    } catch (e) {
      console.error(e);
    }

    return {};
  }, [ctx.code]);

  return result;
}

function Provider({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState(CODE);

  return (
    <Context.Provider value={{ code, setCode }}>{children}</Context.Provider>
  );
}
Editor.Provider = Provider;
