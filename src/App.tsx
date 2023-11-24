import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusinessDetails from './BusinessDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/data/:city" element={<BusinessDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
