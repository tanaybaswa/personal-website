import { FiSun, FiMoon } from "react-icons/fi"; // Importing the icons from react-icons/feather
import useAppStore from "@/store/AppStore";

export default function DarkModeToggle() {
  const { darkModeEnabled, toggleDarkMode } = useAppStore();

  return (
    <div className="flex justify-center items-center">
      <button onClick={toggleDarkMode} className="focus:outline-none">
        {darkModeEnabled ? (
          <FiSun 
          color="white"
          size={32}
          />
        ) : (
          <FiMoon 
          color="black"
          size={32}
           /> 
        )}
      </button>
    </div>
  );
}
