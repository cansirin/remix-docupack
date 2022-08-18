import { Menu } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";
import React, { FC, useEffect, useState } from "react";
import { OpenMenuTransition } from "../OpenMenuTransition";
import { MenuItem } from "../MenuItem";
import Avatar from "boring-avatars";

export const UserMenu: FC = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    // const user = await Auth.currentAuthenticatedUser();
    // setUser(user);
  };

  return (
    <Menu as="div" className="relative mt-6 inline-block px-3 text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <span className="flex w-full items-center justify-between">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <Avatar
                    size={40}
                    name=""
                    variant="beam"
                    colors={["#92A1C6", "#146A7C"]}
                  />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-gray-900">
                      {/*{user?.username}*/}
                    </span>
                  </span>
                </span>
                <SelectorIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Menu.Button>
          </div>
          <OpenMenuTransition open={open}>
            <Menu.Items
              static
              className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <MenuItem href="/">Home</MenuItem>
                <MenuItem href="documents/new">New Document</MenuItem>
                <MenuItem href="#">Log out</MenuItem>
              </div>
            </Menu.Items>
          </OpenMenuTransition>
        </>
      )}
    </Menu>
  );
};
