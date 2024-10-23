import React, { useContext } from "react";
import "./index.scss";
import { BackgroundContext } from "../../context/BackgroundContext";
import { IBackgroundGradients } from "../../utils/backgroundColors";
import { CloseOutlined } from "@ant-design/icons";

interface ImageCardProps {
  index?: number;
  title?: string;
  background?: IBackgroundGradients;
  backgroundImg?: string;
  setImageBG?: string;
  deleteIcon?: boolean;
  setCurrentPage?: (title: string) => void;
  handleImageDelete?: (id: number | undefined) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  backgroundImg,
  setCurrentPage,
  background,
  setImageBG,
  deleteIcon,
  handleImageDelete,
  index,
}) => {
  const { setBackground, setBackgroundImg } = useContext(BackgroundContext);

  const handleOnClick = () => {
    if (setCurrentPage && title) {
      setCurrentPage(title);
    }

    if (background) {
      setBackgroundImg("");
      setBackground(background.name);
    }

    if (setImageBG) {
      setBackgroundImg(setImageBG);
      setBackground("");
    }
  };

  const divStyle = {
    background: background?.color,
    borderRadius: 10,
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    if (handleImageDelete) handleImageDelete(index);
  };

  return (
    <div className={`imageCard ${title && "mb-10"}`} onClick={handleOnClick}>
      <div style={divStyle} className="imageCard__imageContainer">
        {!background && <img src={backgroundImg} alt="photos" />}
        <div className="imageCard__overlay"></div>
        <div className="imageCard__icon">
          {background?.Icon ? (
            <background.Icon style={{ color: "#fff" }} />
          ) : null}
        </div>

        {deleteIcon && (
          <div
            className="imageCard__deleteIcon"
            onClick={(e) => handleDelete(e)}
          >
            <CloseOutlined />
          </div>
        )}
      </div>
      {title && <p>{title}</p>}
    </div>
  );
};

export default ImageCard;
