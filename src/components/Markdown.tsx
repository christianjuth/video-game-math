import { classNames } from "@/utils";
import ReactMarkdown from "react-markdown";
import stripIndent from "strip-indent";

export function Markdown({
  children,
  size = "md",
  className,
  dark = false,
}: {
  children: string;
  size?: "sm" | "md" | 'lg';
  className?: string;
  dark?: boolean;
}) {
  let sizeClass = "";

  switch (size) {
    case "sm":
      sizeClass = "prose-sm";
      break;
    case "md":
      sizeClass = "prose-md";
      break;
    case "lg":
      sizeClass = "prose-lg";
      break;
  }

  return (
    <ReactMarkdown
      className={classNames(
        "prose",
        dark && "prose-invert",
        sizeClass,
        className
      )}
    >
      {stripIndent(children)}
    </ReactMarkdown>
  );
}
