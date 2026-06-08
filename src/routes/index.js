import React from "react";

import { HashRouter,Routes, Route} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../container/Home";


export default function Router() {

  return (

    <HashRouter>

      <Routes>
<Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        

      </Routes>

    </HashRouter>

  );

}