import { Component, useState } from 'react';
import {loadStdlib} from '@reach-sh/stdlib';

import Navbar from './components/Navbar';
import MainApp from './components/MainApp';

import './App.css';
const reach = loadStdlib('ALGO');
reach.setProviderByName("LocalHost")
const startingBalance = reach.parseCurrency(100);


function App() {
  const [accountDetails, setAccountDetails] = useState({})


  async function connectWallet() {
    console.log("Waiting...")
    const acc = await reach.newTestAccount(startingBalance);
    const accAdd = acc.getAddress();
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    setAccountDetails({
      accountAddress: accAdd,
      accountBalance: bal
    });
    if (await reach.canFundFromFaucet()) {
      console.log("Can Fund from Faucet boys!")
    } else {
      console.log("Ahhh shit here we go again.")
    }
  }

  return (
    <div className='min-h-screen dark-lightblue-gradient'>
      <div className="container mx-auto w-11/12 pt-5">
        <Navbar></Navbar>
        <MainApp></MainApp>
      </div>
    </div>
  );
}

export default App;
