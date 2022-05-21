import { Component, useState, useContext } from 'react';

import { MainAppProvider, MainAppContext } from './context/MainAppContext';
import Navbar from './components/Navbar';
import MainApp from './components/MainApp';

import './App.css';

function App() {
  return (
    <div>
      <div>
        <MainAppProvider>
          <Navbar></Navbar>
          <MainApp></MainApp>
        </MainAppProvider> 
      </div>
    </div>
  );
}

export default App;
