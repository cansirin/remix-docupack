import React, { FC } from "react";

type Props = {
  children: React.ReactNode;
  pageTitle: string;
};

export const MainColumn: FC<Props> = ({ children, pageTitle }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                {pageTitle}
              </h1>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};
