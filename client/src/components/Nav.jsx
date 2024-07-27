import { FiBell } from "react-icons/fi";
import { TfiLineDouble } from "react-icons/tfi";

function Nav() {
  return (
    <>
      <div className="navbar flex items-center justify-between p-5 ">
        <div className="header"><h1 className="heading text-2xl font-bold">
          Hospi<span className="tech text-red-500 font-bold ">Tech.</span>
        </h1>
        </div>
        <div className="nav-btns flex flex-row gap-2">
        <div className="Notification bg-slate-400 border-none h-8 w-8 rounded-full text-sm text-white flex justify-center items-center "><FiBell/></div>
        <div className="Button bg-slate-400 border-none h-8 w-14 rounded-3xl text-2xl text-white flex justify-center items-center "><TfiLineDouble/></div>
        </div>
      </div>
      
      <hr className="line w-72 ml-9  "/>
      
    </>
  );
}

export default Nav;
