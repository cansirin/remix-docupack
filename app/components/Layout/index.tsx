import type { FC, ReactNode } from "react";
import { Sidebar } from "../Sidebar";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      <div className="relative flex-1 overflow-y-auto focus:outline-none">
        {children}
      </div>
    </div>
  );
};
