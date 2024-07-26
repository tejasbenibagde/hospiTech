import { useEffect, useState } from 'react';
import { GrMoon } from "react-icons/gr";
import { GrSun } from "react-icons/gr";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 bg-gray-200 dark:bg-card-bg text-color-light dark:text-color-light rounded-full"
        >
            {isDarkMode ? <GrSun color="#F5E9DD" size={15} /> : <GrMoon color="#494949" size={15} />}
        </button>
    );
};

export default DarkModeToggle;
