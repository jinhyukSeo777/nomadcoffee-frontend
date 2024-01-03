import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { ThemeProvider } from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, darkTheme, lightTheme } from "./theme";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Header from "./components/Header";
import CreateCoffeeShop from "./screens/CreateCoffeeShop";
import Detail from "./screens/Detail";
const Home = lazy(() => import("./screens/Home"));

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add" element={<CreateCoffeeShop />} />
          <Route path="/shop/:id" element={<Detail />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
