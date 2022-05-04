import logo from './logo.svg';
import { useState } from 'react';
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
    <p class="text-slate-400 hover:text-sky-400">The quick brown fox...</p>
  );
}

export default App;
