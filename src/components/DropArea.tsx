import { useState } from "react";

type DropAreaProps = {
  onDrop: () => void;
  active?: boolean;
  alwaysDisplay?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function DropArea({ className, style, onDrop, active, alwaysDisplay, children }: DropAreaProps) {
  const [isVisible, setIsVisible] = useState(false);

  const showArea = () => {
    setIsVisible(true);
  };

  const hideArea = () => {
    setIsVisible(false);
  };

  const visibility = isVisible || alwaysDisplay || children

  return (
    <div
      className={[
        "before:z-[-1] flex items-center justify-center relative min-h-2 w-full p-0 transition-[padding,opacity] before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-dashed before:border-gray-500 before:bg-gray-600 only:h-32",
        visibility && "opacity-100",
        visibility && (children ? "py-4" : "py-8"),
        !visibility && "opacity-0",
        className,
      ].filter(Boolean).join(" ")}
      onDragEnter={() => active && showArea()}
      onDragLeave={() => active && hideArea()}
      onDrop={() => {
        if (active) {
          onDrop();
          hideArea();
        }
      }}
      onDragOver={(ev) => active && ev.preventDefault()}
      style={style}
    >
      {children}
    </div>
  );
};
