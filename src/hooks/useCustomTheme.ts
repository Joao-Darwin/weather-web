import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

const useCustomTheme = () => {
    const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext)
    return { theme, isDarkMode, toggleTheme };
}

export default useCustomTheme;