import './App.css';

import MainNav from './components/nav.js';
import Posts from './components/posts.js';
import Detail from './components/detail.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
 
function App() {
  return (
    <div className="App">
      <MainNav />
      <Routes>
        <Route path="/" element={ <Posts /> } />
        <Route path="*" element={ <div>잘못된 요청입니다.</div> } />
        <Route path="/detail" element={ <Detail /> } />
      </Routes>
      
      
    </div >
  );
}

export default App;
