import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCode } from "./Editor";
import { classNames } from "@/utils";

export type TestCase = [string, (classes: { Vec2: any; Matrix: any }) => void];

function Test({ test }: { test: TestCase }) {
  const [passed, setPassed] = useState<boolean>();
  const code = useCode();
  const [name, testFn] = test

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        testFn(code);
        setPassed(true);
      } catch (e) {
        setPassed(false);
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, [testFn, code]);

  return (
    <div
      className={classNames(
        "p-4 flex flex-row justify-between items-center",
        passed && "text-emerald-400",
        !passed && "text-red-500",
        passed === undefined && "text-slate-400"
      )}
    >
      {name}
      {passed && <BsFillCheckCircleFill className="inline-block ml-2 mr-px" />}
      {passed === false && <IoCloseCircle className="inline-block ml-2 text-xl -mr-px" />}
      {passed === undefined && (
        <AiOutlineLoading3Quarters className="inline-block ml-2 animate-spin mr-px" />
      )}
    </div>
  );
}

export function Tests({
  children,
}: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  return (
    <div className="bg-slate-950 rounded-lg divide-y divide-slate-800/90">
       <span className="text-slate-500 px-4 py-3 block">
        TESTS
      </span>
      {children}
    </div>
  );
}
Tests.Test = Test;
