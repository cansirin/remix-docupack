import { FC, ReactNode } from "react";
import { Color } from "../../../utils/color";

type Props = {
  size: Size;
  bgColor?: Color;
  textColor?: Color;
  children: ReactNode;
};

type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";

export const Badge: FC<Props> = ({ size, bgColor, textColor, children }) => {
  return (
    <span
      className={`mx-1 inline-flex items-center rounded-full px-3 py-0.5 text-${size} font-medium bg-${bgColor}-100 text-${textColor}-800 overflow-hidden overflow-ellipsis`}
    >
      {children}
    </span>
  );
};
