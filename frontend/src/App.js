import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProvinciasView from './views/ProvinciasView';
import ProfesoresView from './views/ProfesoresView';
import DepartamentosView from './views/DepartamentosView';
import CursosView from './views/CursosView';
import AsignaturasView from './views/AsignaturasView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/provincias" element={<ProvinciasView />}/>
        <Route path="/profesores" element={<ProfesoresView/>}/>
        <Route path="/departamentos" element={<DepartamentosView/>}/>
        <Route path='/cursos' element={<CursosView/>}/>
        <Route path='/asignaturas' element={<AsignaturasView/>}/>
      </Routes>
    </Router>
  );
};

export default App;
