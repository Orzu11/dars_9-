import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface AppContextType {
  // Define your context properties here
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const value: AppContextType = {
    // Initialize your context values here
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
