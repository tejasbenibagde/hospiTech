import { FiBell } from "react-icons/fi";
import { TfiLineDouble } from "react-icons/tfi";
import { RiLoginCircleLine } from "react-icons/ri";
import NavMenu from "./NavMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkModeToggle from "../ui/buttons/DarkModeToggle";

function Nav() {

    const [nav, setNav] = useState(false);

    const { token } = useSelector((state) => state.auth)

    return (
        <div className="flex flex-col gap-5">
            <div className="navbar flex items-center justify-between">
                <div className="header">
                    <Link to={"/"} className="text text-heading text-xl">
                        Hospi<span className="tech text-primary font-bold">Tech.</span>
                    </Link>
                </div>
                <div className="nav-btns flex flex-row gap-2">
                    {token ? (
                        <>
                            <Link to={"/notifications"} className="bg-card-bg h-8 w-8 rounded-full flex items-center justify-center">
                                <FiBell color="#F5E9DD" size={15} />
                            </Link>
                            <button onClick={() => setNav(true)} className="bg-card-bg h-8 w-16 rounded-full flex items-center justify-center cursor-pointer">
                                <TfiLineDouble color="#F5E9DD" size={25} />
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center justify-center gap-2.5">
                            <DarkModeToggle />
                            <Link
                                to={"/login"}
                                className="text p-2 bg-primary text-color-light dark:text-color-light rounded-full shadow-md shadow-primary">
                                <RiLoginCircleLine color="rgb(245 233 221)" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {nav && (
                <NavMenu close={() => setNav(false)} />
            )}
            <hr className="bg-background-light opacity-15" />
        </div>
    );
}

export default Nav;
