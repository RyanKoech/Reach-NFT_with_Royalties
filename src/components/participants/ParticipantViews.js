import React from "react";
import { loadStdlib } from "@reach-sh/stdlib";

import bgImg from "../../assets/nft-2.png";

const Reach = loadStdlib("ALGO");

const fmt = (x) => Reach.formatCurrency(x, 4);

export const InformTimeout = () => {
  return (
    // <div>Timeout was observed</div>
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <p className=" font-bold">Timeout was observed</p>
      </div>
    </div>
  );
};

export const SeeOutcome = ({ price, address }) => {
  const formatAddress = Reach.formatAddress(address);
  const formatPrice = fmt(price);
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div>
          {formatAddress}{" "}
          <p className=" font-bold">won the Auction and Paid</p> 
          {formatPrice}{" "}<span className=" font-bold">ALGO. </span>
          <p className=" font-bold">Watchout for the next aution to begin...</p>
        </div>
      </div>
    </div>
  );
};

export const ShowBid = ({ bid }) => {
  const formatBid = fmt(bid);
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div>
          <p className=" font-bold">Current leading bid is</p>
          {formatBid}{" "}<span className=" font-bold">ALGO. </span>
          <p className=" font-bold">Waiting for next bidder...</p>
        </div>
      </div>
    </div>
  );
};

export const IsAuctionOn = ({ isAuctionOn }) => {
  const handleReject = () => {
    return isAuctionOn(false);
  };
  const handleAccept = () => {
    return isAuctionOn(true);
  };

  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start -ful px-2 py-8">
          <p className="py-3 text-5xl md:text-5xl font-bold">
            Wanna Start the Bid?
          </p>
          <button
            className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg "
            onClick={handleAccept}
          >
            Yes
          </button>
          <button
            className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg "
            onClick={handleReject}
          >
            No
          </button>
        </div>

        <div>
          <img className="w-full" src={bgImg} alt="nft" />
        </div>
      </div>
    </div>
  );
};

export const AwaitingFirstBidder = () => {
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <p className=" font-bold">Waiting for the First Bidder...</p>
      </div>
    </div>
  );
};
