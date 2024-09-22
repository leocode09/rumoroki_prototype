import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto md:max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
