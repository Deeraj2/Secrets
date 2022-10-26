import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Authentication from './components/Authentication/Authentication';
import Home from './components/Home/Home';
import AlertData from './components/Alert/AlertData';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route path='/' element={<Navigate replace to="/diary" />} />
        <Route path='/diary' element={ <Home /> } />
      </Routes>
      <AlertData />
    </div>
  );
}

export default App;
