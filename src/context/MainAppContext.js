import React, {useEffect, useState} from "react";
import {loadStdlib} from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';


const reach = loadStdlib('ALGO');
// reach.setProviderByName("LocalHost")
// reach.setWalletFallback(reach.walletFallback({
//   providerEnv: 'TestNet', MyAlgoConnect }));
const startingBalance = reach.parseCurrency(100);




export const MainAppContext = React.createContext();

export const MainAppProvider = ({children}) => {


  const [appView, setAppView] = useState("ConnectWallet");
  const [accountBalance, setAccountBalance] = useState(0);
  const [participant, setParticipant] = useState();
  const [accountBal, setAccountBal] = useState(0);
  const [account, setAccount] = useState();

  async function connectWallet() {
    setAppView("Loading");
    console.log("Loading...")
    // const acc = await reach.getDefaultAccount();
    const acc = await reach.newTestAccount(startingBalance);
    const accAdd = reach.formatAddress(acc.getAddress());
    const balAtomic = await reach.balanceOf(acc);
    const bal = reach.formatCurrency(balAtomic, 4);
    if(acc){
      setAccount(acc);
      setAccountBal(bal)
      setAppView("ChooseRole");
    }else{
      setAccount(0);
      setAccountBal(0);
    }
    if (await reach.canFundFromFaucet()) {
      console.log("Can Fund from Faucet boys!");
      console.log(accAdd);
      console.log(bal);
    } else {
      console.log("Ahhh shit here we go again.");
      console.log(accAdd);
      console.log(bal);
    }
  }

  function deployCreator() {
    setParticipant("Creator");
  }

  function deployBidder() {
    setParticipant("Bidder")
  }


  return(
    <MainAppContext.Provider value={{connectWallet, appView, participant, deployBidder, deployCreator, accountBal, setAccountBal, account}}>
      {children}
    </MainAppContext.Provider>
  )
}