import React, { FC, useEffect, useState } from "react";
import { UserMenu } from "../UserMenu";
import { Nav } from "../Nav";

const authenticated = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Documents",
    href: "/documents",
    current: false,
  },
  { name: "Templates", href: "/templates", current: false },
  { name: "Packs", href: "/packages", current: false },
  { name: "Settings", href: "/profile-settings", current: false },
];

export const Sidebar: FC = () => {
  const [user, setUser] = useState(null);
  const navItems = authenticated;
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {};
  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <div className="hidden min-h-full lg:flex lg:flex-shrink-0">
        <div className="flex w-64 flex-col border-r border-gray-200 bg-gray-100 pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-6">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
              alt="Workflow"
            />
          </div>
          {/* User account dropdown */}
          <div className="flex h-0 flex-1 flex-col overflow-y-auto">
            <UserMenu />
            <Nav items={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
};
