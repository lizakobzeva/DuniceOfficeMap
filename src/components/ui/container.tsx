import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: Props) => {
  return (
    <div
      className={cn("mx-auto max-w-[1280px] w-[screen-3rem] p-3", className)}
    >
      {children}
    </div>
  );
};

export default Container;
