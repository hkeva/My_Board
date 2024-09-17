import React from "react";
import "./index.scss";
import { Tooltip } from "antd";

interface HeaderProps {
  onDrawerOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onDrawerOpen }) => {
  const handleOnClick = () => {
    onDrawerOpen();
  };

  return (
    <div className="header">
      <h2>My Board</h2>
      <Tooltip title="Change Background">
        <div
          className="header__changeBGColorIcon"
          onClick={handleOnClick}
        ></div>
      </Tooltip>
    </div>
  );
};

export default Header;
