import { classNames } from "@/utils";

export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "rounded-lg overflow-hidden shadow-md",
        className,
        className.indexOf("bg-") === -1 && "bg-white",
        // className.indexOf("border-") === -1 && "border border-slate-300"
      )}
    >
      {children}
    </div>
  );
}
