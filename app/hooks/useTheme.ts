import { useState } from "react";


const useLightOrDark = () => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }
    return { currentTheme, toggleTheme };
}

export default useLightOrDark;