import React, { useContext } from "react";
import { MainAppContext } from "../../context/MainAppContext";
import { scaleIcon } from "@heroicons/react/solid";

import bgImg from "../../assets/nft-2.png";
import userImg from "../../assets/user.jpg";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { ScaleIcon } from "@heroicons/react/solid";

const exports = {};

exports.ConnectWallet = ({connectWallet}) => {

  return (
    <div>
      <div className="w-full h-screen bg-zinc-200 flex flex-col justify-between">
        <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
          <div className="flex flex-col justify-center md:items-start -ful px-2 py-8">
            <p className="text-2xl">NFT minting and Biding</p>
            <h1 className="py-3 text-5xl md:text-7xl font-bold">NarFkeT</h1>
            <p className="text-1xl">
              {" "}
              Welcome to the NFT Minting and Biding Website
            </p>
            <button className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg " onClick={connectWallet}>
              Get Started
            </button>
          </div>
          <div>
            <img className="w-full" src={bgImg} alt="nft" />
          </div>

          {/* <div className="absolute flex flex-col py-8 md:min-w-[760px] button-[-5%] mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 border-slate-300 rounded-xl text-center shadow-xl">
          <p>Data Services</p>
          <div>
            <p><scaleIcon/>Icon, Create</p>
            <p><scaleIcon/>Icon, Bidder</p>
            <p><scaleIcon/>Icon, Create</p>
            <p><scaleIcon/>Icon, Create</p>
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
};

exports.ChooseRole = (obj) => {
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start -ful px-2 py-8">
          <h1 className="py-3 text-5xl md:text-5xl font-bold">
            Please Select User
          </h1>
          <button
            className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg "
            onClick={obj.deployCreator}
          >
            <PlusCircleIcon className="h-6 text-indigo-200" />
            Creator
          </button>
          <button
            className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg "
            onClick={obj.deployBidder}
          >
            <ScaleIcon className="h-6 text-indigo-200" />
            Bidder
          </button>
        </div>
        <div>
          <img className="w-full" src={bgImg} alt="nft" />
        </div>
      </div>
    </div>
  );
};

exports.Loading = (obj) => {
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div>
          `<p className=" font-bold">Connecting Wallet...</p>
        </div>
      </div>
    </div>
  );
};

const AppViews = (props) => {
  const { deployBidder, deployCreator, connectWallet } = useContext(MainAppContext);

  return exports[props.view]({ deployBidder, deployCreator, connectWallet });
};

export default AppViews;
