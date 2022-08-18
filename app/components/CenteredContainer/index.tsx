import * as React from "react";
import { cx } from "../../../utils/cx";

export interface Props {
  children: React.ReactNode;
  className?: string;
}

export const CenteredContainer: React.FC<Props> = ({ children, className }) => {
  className = cx("px-4 mx-auto max-w-7xl sm:px-6 lg:px-8", className);

  return <div className={className}>{children}</div>;
};
