import React, { useState, useEffect } from "react";
import Header from "./components/header";
import CustomDrawer from "./components/drawer";
import { BackgroundContext } from "./context/BackgroundContext";
import { CombinedBackgrounds } from "./utils/backgroundColors";
import "./styles/global.scss";
import "./App.scss";
import Board from "./components/board";
import { Spin } from "antd";

const App: React.FC = () => {
  const [background, setBackground] = useState("greenish");
  const [backgroundImg, setBackgroundImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (backgroundImg) {
      setIsLoading(true);
      const img = new Image();
      img.src = backgroundImg;

      img.onload = () => {
        setIsLoading(false);
      };

      img.onerror = () => {
        setIsLoading(false);
      };
    }
  }, [backgroundImg]);

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
        {isLoading && (
          <div className="app__spinner">
            <Spin size="small" />
          </div>
        )}
        <Header onDrawerOpen={onDrawerOpen} />
        {isDrawerOpen && <CustomDrawer onClose={onDrawerClose} />}
        <Board />
      </div>
    </BackgroundContext.Provider>
  );
};

export default App;
