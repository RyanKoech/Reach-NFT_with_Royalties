import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {loadStdlib} from '@reach-sh/stdlib'
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <button type="button" onClick={connectWallet}>
            Connect
          </button>
        </p>
        <div>
          <ul>
            <li>Account Address: {accountDetails.accountAddress}</li>
            <li>Account Balance: {accountDetails.accountBalance}</li>
          </ul>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
