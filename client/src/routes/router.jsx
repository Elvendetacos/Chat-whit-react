import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "../pages/login";
import Chat from "../pages/chatMenu";
import Context from "../Context/context";


function router() {
  const [userName, setUserName] = useState();
  return (
    <Context.Provider value={{userName, setUserName}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default router;
