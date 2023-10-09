import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppRoutes from "./Routes/router";

function App() {
  library.add(fas);
  return <AppRoutes />;
}

export default App;
