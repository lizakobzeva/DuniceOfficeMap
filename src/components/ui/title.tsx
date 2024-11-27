import { cn } from "@/lib/utils";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

const Title = ({ text, size = "sm", className }: Props) => {
  const mapTagSize = {
    xs: "h5",
    sm: "h4",
    md: "h3",
    lg: "h2",
    xl: "h1",
    "2xl": "h1",
  } as const;

  const mapClassNameBySize = {
    xs: "text-[16px]",
    sm: "text-[22px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[48px]",
    "2xl": "text-[48px]",
  } as const;

  return React.createElement(
    mapTagSize[size],
    { className: cn(mapClassNameBySize[size], className, "font-bold") },
    text
  );
};

export default Title;
