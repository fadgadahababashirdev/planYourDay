import React, { useEffect, useRef } from 'react';
import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './components/Home';
import Dos from './components/Dos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='w-screen h-screen text-white'>
       <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/createAct" element={<Dos/>}></Route>
    </Routes>
  
    </div>
  );
};

export default App;
