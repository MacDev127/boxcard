// // src/context/ThemeContext.tsx
// import React, { createContext, useMemo, useState } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// type ThemeContextType = {
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// };

// export const CustomThemeContext = createContext<ThemeContextType>({
//   isDarkMode: false,
//   toggleDarkMode: () => {},
// });

// const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   const muiTheme = useMemo(() => {
//     return createTheme({
//       palette: {
//         mode: isDarkMode ? 'dark' : 'light',
//       },
//     });
//   }, [isDarkMode]);

//   return (
//     <CustomThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
//     </CustomThemeContext.Provider>
//   );
// };

// export default ThemeContextProvider;
