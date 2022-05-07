import { Component, useState, useContext } from 'react';

import { MainAppProvider, MainAppContext } from './context/MainAppContext';
import Navbar from './components/Navbar';
import MainApp from './components/MainApp';

import './App.css';

function App() {
  return (
    <div className='min-h-screen dark-lightblue-gradient'>
      <div className="container mx-auto w-11/12 pt-5">
        <MainAppProvider>
          <Navbar></Navbar>
          <MainApp></MainApp>
        </MainAppProvider> 
      </div>
    </div>
  );
}

export default App;
