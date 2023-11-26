import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BusinessDetailsPage from "./components/BusinessDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/api" element={<BusinessDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
