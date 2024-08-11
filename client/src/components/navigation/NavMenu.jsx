
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DarkModeToggle from "../ui/buttons/DarkModeToggle";

const links = [
  { id: 1, label: "Home", path: "/" },
  { id: 2, label: "Patient", path: "/patients" },
  { id: 3, label: "Appointments", path: "/appointments" },
  { id: 4, label: "Patient History", path: "/patient-history" },
];

const NavMenu = ({ close }) => {
  return (
    <div className="absolute top-0 left-0 bg-background-light dark:bg-background-dark w-full h-full z-50 px-5 py-7 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="header">
          <h1 className="text text-heading text-xl">
            Hospi<span className="tech text-primary font-bold">Tech.</span>
          </h1>
        </div>

        <div className="flex items-center justify-center gap-2">
        <div className="togg bg-card-bg h-8 w-8 rounded-full flex items-center justify-center ">
          <DarkModeToggle />
          </div>
          <button onClick={close} className=" bg-card-bg  dark:text-primary h-8 w-16 rounded-full flex items-center justify-center font-bold text-xl"><IoCloseSharp/></button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center  text-xl gap-5 pt-8 cursor-pointer">
        {links.map(link => (
          <Link key={link.id} to={link.path} className="text hover:text-primary" onClick={close}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
