import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProvinciasView from './views/ProvinciasView';
import ProfesoresView from './views/ProfesoresView';
import DepartamentosView from './views/DepartamentosView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/provincias" element={<ProvinciasView />}/>
        <Route path="/profesores" element={<ProfesoresView/>}/>
        <Route path="/departamentos" element={<DepartamentosView/>}/>
      </Routes>
    </Router>
  );
};

export default App;
