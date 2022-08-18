import type { FC } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { getCssText } from "~/stitches.config";

export interface ClientStyleProps {
  reset: () => void;
  sheet: string;
}

const ClientStyleContext = createContext<ClientStyleProps>({
  reset: () => {},
  sheet: "",
});

export const useClientStyle = () => useContext(ClientStyleContext);

type StyleProviderProps = {
  children: React.ReactNode;
};

export const ClientCacheProvider = ({ children }: StyleProviderProps) => {
  const [sheet, setSheet] = useState(getCssText());
  const reset = useCallback(() => {
    setSheet(getCssText());
  }, []);

  return (
    <ClientStyleContext.Provider value={{ reset, sheet }}>
      {children}
    </ClientStyleContext.Provider>
  );
};
