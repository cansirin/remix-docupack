import React from "react";
import { User } from "~/models/user.server";

export interface AuthUser {
  username: string;
  attributes: {
    email: string;
  };
}

export const UserContext = React.createContext<User | null>(null);

export const useUserContext = () => React.useContext(UserContext);

type UserContextManagerProps = {
  user: User | null;
  children: React.ReactNode;
};

export const UserContextManager = ({
  user,
  children,
}: UserContextManagerProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
