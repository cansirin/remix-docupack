import React, { FC } from "react";
import { cx } from "../../../utils/cx";

export const ButtonLink: FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props
) => {
  const classNames = cx(
    "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    props.className
  );

  return (
    <a {...props} className={classNames}>
      {props.children}
    </a>
  );
};
