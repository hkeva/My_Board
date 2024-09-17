import { FaSkyatlas } from "react-icons/fa";
import { PiRainbowCloudBold, PiOrangeSliceFill } from "react-icons/pi";
import { FaRegSnowflake } from "react-icons/fa";
import { GiStrawberry } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { GiPeach } from "react-icons/gi";
import { FaEarthAmericas } from "react-icons/fa6";

export interface IBackgroundGradients {
  name: string;
  color: string;
  Icon?: React.ComponentType<{ style?: React.CSSProperties }>;
}

export const BackgroundGradients = [
  {
    name: "ice",
    Icon: FaRegSnowflake,
    color: "linear-gradient(135deg, #1c4966, #2c759e, #3b9fc1, #67c8de)",
  },
  {
    name: "sky",
    Icon: FaSkyatlas,
    color: "linear-gradient(to right, #a2c2e5, #f0f4f8)",
  },
  {
    name: "rainbow",
    Icon: PiRainbowCloudBold,
    color:
      "linear-gradient(45deg,#f5a9a9,#f9c59d,#f9e29d,#d4f9d9,#a9d9f5,#c1a9f5,#f5a9c1)",
  },
  {
    name: "strawberry",
    Icon: GiStrawberry,
    color: "linear-gradient(135deg, #fc5c7d, #6a82fb)",
  },
  {
    name: "orangish",
    Icon: PiOrangeSliceFill,
    color: "linear-gradient(45deg, #fbd786, #f5794a)",
  },
  {
    name: "greenish",
    Icon: FaLeaf,
    color: "linear-gradient(135deg, #a8d8d8, #c4e2c4)",
  },
  {
    name: "peachy",
    Icon: GiPeach,
    color: "linear-gradient(135deg, #f5a6a4, #f7d3d3)",
  },
  {
    name: "lovely",
    Icon: TiHeartFullOutline,
    color: "linear-gradient(135deg, #ff6f61, #d23f57)",
  },
  {
    name: "earth",
    Icon: FaEarthAmericas,
    color: "linear-gradient(135deg, #aaffcc, #99ccff, #003366)",
  },
];

export const BackgroundColors = [
  {
    name: "subtle-green",
    color: "linear-gradient(180deg, #9ACD32 0%, #9ACD32 100%)",
  },
  {
    name: "subtle-orange",
    color: "linear-gradient(180deg, #FFA07A 0%, #FFA07A 100%)",
  },
  {
    name: "subtle-blue",
    color: "linear-gradient(180deg, #ADD8E6 0%, #ADD8E6 100%)",
  },
  {
    name: "subtle-red",
    color: "linear-gradient(180deg, #FFCCCB 0%, #FFCCCB 100%)",
  },
  {
    name: "subtle-purple",
    color: "linear-gradient(180deg, #D8BFD8 0%, #D8BFD8 100%)",
  },
  {
    name: "subtle-pink",
    color: "linear-gradient(180deg, #FFB6C1 0%, #FFB6C1 100%)",
  },
  {
    name: "subtle-sky",
    color: "linear-gradient(180deg, #B0E0E6 0%, #B0E0E6 100%)",
  },
  {
    name: "subtle-gray",
    color: "linear-gradient(180deg, #D3D3D3 0%, #D3D3D3 100%)",
  },
  {
    name: "tomato",
    color: "linear-gradient(180deg, #FF6347 0%, #FF6347 100%)",
  },
];

// Concatenate arrays
export const CombinedBackgrounds = [
  ...BackgroundGradients,
  ...BackgroundColors.map((colorObj) => ({
    ...colorObj,
    Icon: undefined,
  })),
];
