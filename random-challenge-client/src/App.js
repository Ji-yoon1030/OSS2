import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";
import History from "./pages/History";
import Main from "./pages/Main";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
