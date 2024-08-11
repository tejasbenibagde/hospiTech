import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../../redux/features/darkModeSlice"; // adjust the path as needed
import { GrMoon, GrSun } from "react-icons/gr";

const DarkModeToggle = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 bg-gray-200 dark:bg-card-bg text-color-light dark:text-color-light rounded-full"
    >
      {isDarkMode ? (
        <GrSun color="#F5E9DD" size={15} />
      ) : (
        <GrMoon color="#494949" size={15} />
      )}
    </button>
  );
};

export default DarkModeToggle;
