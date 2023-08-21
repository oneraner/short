import { AiFillHome } from "react-icons/ai";
import { LuUser, LuUsers } from "react-icons/lu";
import { BiMessageAltMinus, BiCalendarPlus } from "react-icons/bi";

export const Footer = () => {
  return (
    <footer>
      <ul className="flex justify-around bg-black p-2">
        <li className="flex flex-col justify-center items-center text-white">
          <AiFillHome className="w-6 h-6" />
          <span className="text-xs">首頁</span>
        </li>
        <li className="flex flex-col justify-center items-center text-white">
          <LuUsers className="w-6 h-6" />
          <span className="text-xs">好友</span>
        </li>
        <li className="flex flex-col justify-center items-center text-white">
          <BiCalendarPlus className="h-10 w-10" />
        </li>
        <li className="flex flex-col justify-center items-center text-white">
          <BiMessageAltMinus className="w-6 h-6" />
          <span className="text-xs">收信匣</span>
        </li>
        <li className="flex flex-col justify-center items-center text-white">
          <LuUser className="w-6 h-6" />
          <span className="text-xs">個人資料</span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
