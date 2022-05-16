import React from "react";
import { useContext } from "react";

import {loadStdlib} from '@reach-sh/stdlib';

import { MainAppContext } from "../context/MainAppContext";
const Reach = loadStdlib('ALGO');

const fmt = (x) => Reach.formatCurrency(x, 4);


const Navbar = () => {
  const {accountBal} = useContext(MainAppContext);

  const {connectWallet} = useContext(MainAppContext)
  return (
      <div>
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
        <p>{accountBal}</p>
      </div>
  );
};

export default Navbar;
