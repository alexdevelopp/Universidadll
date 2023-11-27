import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProvinciasView from './views/ProvinciasView';
import ProfesoresView from './views/ProfesoresView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/provincias" element={<ProvinciasView />}/>
        <Route path='/profesores' element={<ProfesoresView/>}/>
      </Routes>
    </Router>
  );
};

export default App;
