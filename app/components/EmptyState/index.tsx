import { Link } from "@remix-run/react";
import React, { FC } from "react";
import { Color } from "../../../utils/color";
import { ButtonLink } from "../ButtonLink";

type Props = {
  message: string;
  link?: string;
  icon: JSX.Element;
};

export const EmptyState: FC<Props> = ({ message, link, icon }) => {
  return (
    <div className="flex w-full flex-col space-y-4 py-24">
      <div className="self-center">{icon}</div>
      <div className="self-center text-lg">{message}</div>
      {link && (
        <div className="self-center">
          <Link to={link || "#"}>
            <ButtonLink color={Color.Purple}>Get started</ButtonLink>
          </Link>
        </div>
      )}
    </div>
  );
};
