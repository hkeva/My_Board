import React, { useState } from "react";
import Header from "./components/header";
import CustomDrawer from "./components/drawer";
import { BackgroundContext } from "./context/BackgroundContext";
import { CombinedBackgrounds } from "./utils/backgroundColors";
import "./styles/global.scss";
import "./App.scss";

const App: React.FC = () => {
  const [background, setBackground] = useState("greenish");
  const [backgroundImg, setBackgroundImg] = useState("");

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const onDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const onDrawerClose = () => {
    setDrawerOpen(false);
  };

  const backgroundColor = CombinedBackgrounds.find(
    (bg) => bg.name === background
  )?.color;

  const divStyle = {
    backgroundImage: backgroundImg ? `url(${backgroundImg})` : backgroundColor,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <BackgroundContext.Provider
      value={{ background, setBackground, backgroundImg, setBackgroundImg }}
    >
      <div className="app" style={divStyle}>
        <Header onDrawerOpen={onDrawerOpen} />
        <CustomDrawer open={isDrawerOpen} onClose={onDrawerClose} />
      </div>
    </BackgroundContext.Provider>
  );
};

export default App;
