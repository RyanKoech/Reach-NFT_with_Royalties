import React from "react";
import { useContext } from "react";

import { MainAppContext } from "../context/MainAppContext";

const Navbar = () => {

  const {connectWallet} = useContext(MainAppContext)
  return (
      <button onClick={connectWallet}>
        Connect Wallet
      </button>
  );
};

export default Navbar;
