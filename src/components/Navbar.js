import React from "react";
import { useContext } from "react";

import {loadStdlib} from '@reach-sh/stdlib';

import { MainAppContext } from "../context/MainAppContext";
const Reach = loadStdlib('ALGO');

const fmt = (x) => Reach.formatCurrency(x, 4);


const Navbar = () => {
  const {accountBal} = useContext(MainAppContext);
  const {account} = useContext(MainAppContext);

  const {connectWallet} = useContext(MainAppContext);
  return (
      <div>
        <div className="w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-4 sm:text-4xl">NarFkeT.</h1>
              <ul className="hidden md:flex">
                <li>Home</li>
                <li>About</li>
                <li>Support</li>
                <li>Platforms</li>

              </ul>
          </div>
          <div className="hidden md:flex pr-4">
            {
            (account == undefined || account == null) 
              ? (
                  <button className=" bg-transparent text-indigo-600 mr-5" onClick={connectWallet}>
                    Connect Wallet 
                  </button>
                ) 
              : (
                <div>
                  <span className=" font-bold">Balance: </span><span>{accountBal}</span><span className=" font-bold"> ALGO</span>
                </div>
              )
            }
              {/* <div className="md:hidden" >
                  {!nav ? <MenuIcon className="w-5"/> : <XIcon className="w-5"/> }
                <MenuIcon className="w-5"/>
              </div>
               */}
          </div>
      </div>
      
    {/* <ul className="absolute bg-zinc-200 v-full px-8">
        <li className=" border-b-2 border-zinc-300 w-full">Home</li>
        <li className=" border-b-2 border-zinc-300 w-full">About</li>
        <li className=" border-b-2 border-zinc-300 w-full">Support</li>
        <li className=" border-b-2 border-zinc-300 w-full">Platforms</li>
        <div className="flex flex-col my-4">
            <button className="bg-transparent text-indigo-600 px-8 py-3 mb-3" onClick={connectWallet}>
              Connect Wallet
            </button>
        </div>
    </ul> */}

    </div>


      </div>
      
  );
};

export default Navbar;
