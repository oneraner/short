import { BiSearch } from "react-icons/bi";

export const Header = () => {
  return (
    <nav className="h-10 flex bg-black relative justify-center">
      <ul className="flex w-3/5 justify-around items-center">
        <li className="text-gray-300">探索</li>
        <li className="text-gray-300">關注中</li>
        <li className="text-white relative">
          為您推薦
          <div className="bg-white absolute -bottom-2 left-1/2 w-2/5 h-1 -translate-x-1/2 rounded-md" />
        </li>
      </ul>
      <BiSearch className="text-white w-6 h-6 absolute top-1/2 -translate-y-1/2 right-1" />
    </nav>
  );
};

export default Header;
