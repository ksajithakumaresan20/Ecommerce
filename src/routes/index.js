import React from "react";

import { BrowserRouter,Routes, Route} from "react-router-dom";

import Login from "../pages/Login";
import Home from "../container/Home";


export default function Router() {

  return (

    <BrowserRouter>

      <Routes>
<Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        

      </Routes>

    </BrowserRouter>

  );

}