import React, { FC } from "react";
import { cx } from "../../../utils/cx";

type Props = {
  items: NavItem[];
};

type NavItem = {
  name: string;
  href: string;
  current: boolean;
};

const logout = async () => {
  try {
    location.href = "/auth/login";
  } catch (error) {
    console.log("error signing out: ", error);
  }
};

export const Nav: FC<Props> = ({ items }) => {
  return (
    <nav className="mt-6 px-3">
      <div className="space-y-1">
        {/*{items.map((item) => (*/}
        {/*  <Link href={item.href} key={item.name}>*/}
        {/*    <a*/}
        {/*      className={cx(*/}
        {/*        router.asPath === item.href*/}
        {/*          ? "bg-gray-200 text-gray-900"*/}
        {/*          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",*/}
        {/*        "group flex items-center rounded-md px-2 py-2 text-sm font-medium"*/}
        {/*      )}*/}
        {/*      aria-current={item.current ? "page" : undefined}*/}
        {/*    >*/}
        {/*      {item.name}*/}
        {/*    </a>*/}
        {/*  </Link>*/}
        {/*))}*/}
        <a
          onClick={logout}
          className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
        >
          Log out
        </a>
      </div>
    </nav>
  );
};
