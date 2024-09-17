import { createContext } from "react";

interface BackgroundContextType {
  background: string;
  backgroundImg: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundImg: React.Dispatch<React.SetStateAction<string>>;
}

export const BackgroundContext = createContext<BackgroundContextType>({
  background: "",
  setBackground: () => {},
  backgroundImg: "",
  setBackgroundImg: () => {},
});
