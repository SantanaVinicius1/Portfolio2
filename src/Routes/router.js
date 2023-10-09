import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage, Overview } from "../Pages";

const overview = "/overview";
const home = "/";

const routes = {
  home,
  overview,
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          key={routes.home}
          path={routes.home}
          element={<MainPage />}
        ></Route>
        <Route
          key={routes.overview}
          path={routes.overview}
          element={<Overview />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
