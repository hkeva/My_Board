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
    color: "#9ACD32",
  },
  {
    name: "subtle-orange",
    color: "#FFA07A",
  },
  {
    name: "subtle-blue",
    color: "#ADD8E6",
  },
  {
    name: "subtle-red",
    color: "#FFCCCB",
  },
  {
    name: "subtle-purple",
    color: "#D8BFD8",
  },
  {
    name: "subtle-pink",
    color: "#FFB6C1",
  },
  {
    name: "subtle-sky",
    color: "#B0E0E6",
  },
  {
    name: "subtle-gray",
    color: "#D3D3D3",
  },
  {
    name: "tomato",
    color: "#FF6347",
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
