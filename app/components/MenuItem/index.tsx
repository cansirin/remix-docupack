import { Menu } from "@headlessui/react";
import Link from "next/link";
import { FC } from "react";
import { cx } from "../../../utils/cx";

type Props = {
  href: string;
  children: any;
};

export const MenuItem: FC<Props> = ({ href, children }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={href}>
          <a
            className={cx(
              active ? "bg-gray-100 text-gray-900" : "text-gray-700",
              "block px-4 py-2 text-sm"
            )}
          >
            {children}
          </a>
        </Link>
      )}
    </Menu.Item>
  );
};
