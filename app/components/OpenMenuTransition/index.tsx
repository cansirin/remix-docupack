import { Transition } from "@headlessui/react";
import { FC, Fragment } from "react";

type Props = {
  open: boolean;
  children: any;
};

export const OpenMenuTransition: FC<Props> = ({ open, children }) => {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-out duration-600"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {children}
    </Transition>
  );
};
