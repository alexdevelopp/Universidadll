import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProvinciasView from './views/ProvinciasView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/provincia" element={<ProvinciasView />} />
      </Routes>
    </Router>
  );
};

export default App;
