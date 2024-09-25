import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Drawer, Input, Spin, Tooltip } from "antd";
import { CloseOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import ImageCard from "../imageCard";
import photosImg from "../../assets/images/photos.png";
import colorsImg from "../../assets/images/colors.png";
import addImg from "../../assets/images/add.png";
import {
  BackgroundColors,
  BackgroundGradients,
} from "../../utils/backgroundColors";
import QueueAnim from "rc-queue-anim";
import { BackgroundContext } from "../../context/BackgroundContext";
import axios from "axios";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface Photo {
  id: string;
  urls: {
    small: string;
    regular?: string;
  };
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose }) => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("random");
  const [currentPage, setCurrentPage] = useState("default");
  const [images, setImages] = useState<string[]>(() => {
    const storedImages = localStorage.getItem("images");
    return storedImages ? JSON.parse(storedImages) : [];
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { setBackground } = useContext(BackgroundContext);

  const handleOnClose = () => {
    onClose();
    setCurrentPage("default");
  };

  const onLeftArrowClick = () => {
    setCurrentPage("default");
  };

  const handleSolidBGChange = (name: string) => {
    setBackground(name);
  };

  const loadPhotos = async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_CLIENT_KEY,
            query: query,
            per_page: 12,
            page: page,
          },
        }
      );

      const newPhotos: Photo[] = response.data.results;
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

      if (newPhotos.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPhotos(page, query);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          imageContainerRef.current;

        if (scrollTop + clientHeight + 50 >= scrollHeight) {
          setPage((prevVal) => prevVal + 1);
        }
      }
    };

    const divElement = imageContainerRef.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;

        const updatedImages = [...images, base64String];

        setImages(updatedImages);
        localStorage.setItem("images", JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);

      event.target.value = "";
    }
  };

  const handleEnter = () => {
    if (query) {
      setPhotos([]);
      loadPhotos(page, query);
    }
  };

  const handleImageDelete = (index: number | undefined) => {
    const updatedImages = images.filter((_, i) => i !== index);

    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

  return (
    <Drawer
      open={open}
      closable={false}
      onClose={handleOnClose}
      width={380}
      className="drawer"
    >
      {/* header starts */}
      <div className="drawer__header">
        {currentPage != "default" && (
          <Button
            key="leftArrow"
            type="link"
            icon={<LeftOutlined />}
            onClick={onLeftArrowClick}
            className="font-16"
          />
        )}

        <h3 key="title">Change Background</h3>

        <Button
          type="link"
          icon={<CloseOutlined />}
          onClick={handleOnClose}
          style={{ fontSize: "16px" }}
        />
      </div>
      {/* header ends */}

      {/* default page starts */}
      {currentPage.toLocaleLowerCase() == "default" && (
        <QueueAnim delay={300} type="right" className="queue-simple">
          <div key="default">
            <div className="drawer__cardContainer pl-9">
              <ImageCard
                title="Photos"
                backgroundImg={photosImg}
                setCurrentPage={setCurrentPage}
                key="photos"
              />

              <ImageCard
                title="Colors"
                backgroundImg={colorsImg}
                setCurrentPage={setCurrentPage}
                key="colors"
              />

              <Tooltip title="Maximum of 2 custom pictures allowed.">
                <div className="drawer__fileInputContainer">
                  <ImageCard
                    title="Custom"
                    backgroundImg={addImg}
                    key="colors"
                  />

                  <input
                    type="file"
                    title=""
                    className={`drawer__fileInput ${
                      images.length == 2 && "drawer__fileInput__disabled"
                    }`}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/jpg"
                    disabled={images.length == 2}
                  />
                </div>
              </Tooltip>
            </div>
            <div className="drawer__cardContainer pl-9">
              {images.map((image, index) => (
                <ImageCard
                  backgroundImg={image}
                  key={image}
                  setImageBG={image}
                  deleteIcon
                  index={index}
                  handleImageDelete={handleImageDelete}
                />
              ))}
            </div>
          </div>
        </QueueAnim>
      )}

      {/* default page ends */}

      {/* the page to choose bg color starts */}
      {currentPage.toLocaleLowerCase() == "colors" && (
        <QueueAnim delay={300} type="right" className="queue-simple">
          <div key="bg">
            <div className="drawer__cardContainer pb-25 pl-9 divider">
              {BackgroundGradients.map((bg) => {
                return <ImageCard key={bg.color} background={bg} />;
              })}
            </div>
            <div className="drawer__cardContainer pt-25 pl-10">
              {BackgroundColors.map((bg) => {
                return (
                  <div
                    key={bg.color}
                    className="drawer__solidDivStyle"
                    style={{ background: bg.color }}
                    onClick={() => handleSolidBGChange(bg.name)}
                  ></div>
                );
              })}
            </div>
          </div>
        </QueueAnim>
      )}
      {/* the page to choose bg color ends */}

      {/* the page to choose picture as bg starts */}
      {currentPage.toLocaleLowerCase() == "photos" && (
        <>
          <Input
            className="mb-10"
            prefix={<SearchOutlined />}
            placeholder="Search photos"
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleEnter}
          />

          <div
            className="drawer__cardContainer drawer__scrollDiv"
            ref={imageContainerRef}
          >
            {photos.map((photo) => (
              <ImageCard
                key={photo?.id}
                backgroundImg={photo?.urls?.small}
                setImageBG={photo?.urls?.regular}
              />
            ))}

            {loading && <Spin size="small" />}
            {!hasMore && <p>No more photos</p>}
          </div>
        </>
      )}
      {/* the page to choose picture as bg color ends */}
    </Drawer>
  );
};

export default CustomDrawer;
