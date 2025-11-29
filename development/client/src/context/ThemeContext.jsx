// ========================================
// LEVEL 3: Theme Context
// Learning: Context API, useContext, localStorage
// ========================================

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

/*
🎓 LEARNING NOTES:

1. CONTEXT API:
   - Creates global state accessible anywhere
   - No prop drilling needed
   - Provider wraps app, consumers use useContext

2. LOCALSTORAGE:
   - Persists theme across page reloads
   - localStorage.setItem() to save
   - localStorage.getItem() to retrieve

3. CUSTOM HOOK:
   - useTheme() wraps useContext(ThemeContext)
   - Provides cleaner API: const { theme } = useTheme()
   - Error handling if used outside Provider

4. USEEFFECT:
   - Runs after render
   - Updates DOM attribute when theme changes
   - [theme] dependency array
*/
