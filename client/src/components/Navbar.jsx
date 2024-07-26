import { FiBell } from "react-icons/fi";
import { TfiLineDouble } from "react-icons/tfi";
import DarkModeToggle from "./DarkModeToggle";

function Nav() {
    return (
        <div className="flex flex-col gap-5">
            <div className="navbar flex items-center justify-between">
                <div className="header">
                    <h1 className="text-heading text-xl">
                        Hospi<span className="tech text-primary font-bold">Tech.</span>
                    </h1>
                </div>
                <div className="nav-btns flex flex-row gap-2">
                    <button className="bg-card-bg h-8 w-8 rounded-full flex items-center justify-center">
                        <FiBell color="#F5E9DD" size={15} />
                    </button>
                    <button className="bg-card-bg h-8 w-16 rounded-full flex items-center justify-center">
                        <TfiLineDouble color="#F5E9DD" size={25} />
                    </button>
                    <DarkModeToggle />
                </div>
            </div>
            <hr className="bg-background-light opacity-15" />
        </div>
    );
}

export default Nav;
