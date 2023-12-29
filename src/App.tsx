import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { ThemeProvider } from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, darkTheme, lightTheme } from "./theme";
const Home = lazy(() => import("./screens/Home"));

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
