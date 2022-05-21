import React, { useState } from "react";
import { loadStdlib } from "@reach-sh/stdlib";
import {
  InformTimeout,
  SeeOutcome,
  ShowBid,
  IsAuctionOn,
  AwaitingFirstBidder,
} from "./ParticipantViews";

const Reach = loadStdlib("ALGO");

const fmt = (x) => Reach.formatCurrency(x, 4);

const GetBid = ({ price, getBid }) => {
  const formatPrice = fmt(price);
  const [bid, setBid] = useState(0);
  const handleSubmit = () => {
    getBid(bid);
  };
  return (
    <div className="antaliased">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col space-y-6 bg-cyan-700 w-50% maw-w-4xl p-8 rounded-xl shadow-lg teal-white">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">
                Place your bid
              </h1>
              <p className="pt-2 text-cyan-100 text-sm">
                Price to beat, {formatPrice} ALGO
              </p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 ">
              <form action="" className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="" className="tet-sm">
                    Bid
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder={`> ${formatPrice}`}
                    className="ring-1 ring-gray-500 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300"
                    min={formatPrice}
                    step="0.001"
                    onChange={(e) => {
                      setBid(e.target.value);
                    }}
                  />
                </div>
              </form>
              <div>
                <button
                  className="inline-blovk self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                  onClick={handleSubmit}
                >
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AttachContract = ({ attachContract }) => {
  const [contractInfo, setContractInfo] = useState("");

  const handleSubmit = () => {
    attachContract(contractInfo);
  };
  return (
    <div className="antialised bg-zinc-200 ">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col  md:space-y-6 space-y-6 md:space-x-0  bg-cyan-600 w-full max-w-4xl p-10 mt-6 rounded-xl shadow-lg text-white items-center">
          <div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              class="ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none text-black"
              onChange={(e) => {
                setContractInfo(e.target.value);
              }}
            ></textarea>
            <button
              className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg "
              onClick={handleSubmit}
            >
              Attach
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WaitingOtherBidders = () => {
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div>
          <p className=" font-bold">Please waiting. Placing bid...</p>
        </div>
      </div>
    </div>
  );
};

const AwaitingAution = () => {
  return (
    <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
      <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
        <div>
          <p className=" font-bold">Waiting for Auction to Begin...</p>
        </div>
      </div>
    </div>
  );
};

const BidderViews = ({
  appState,
  args,
  getBidReady,
  isAcutionOnReady,
  isAuctionOn,
  attachContract,
  getBid,
}) => {
  console.log("AppView: ", appState);
  switch (appState) {
    case "attachContract":
      return <AttachContract attachContract={attachContract}></AttachContract>;
    case "getBid":
      return <GetBid price={args[0]} getBid={getBid}></GetBid>;
    case "informTimeout":
      return <InformTimeout />;
    case "seeOutcome":
      return <SeeOutcome price={args[0]} address={args[1]} />;
    case "showBid":
      return <ShowBid bid={args[0]} />;
    case "isAuctionOn":
      return <IsAuctionOn isAuctionOn={isAuctionOn} />;
    case "awaitingFirstBidder":
      return <AwaitingFirstBidder />;
    case "awatingOtherBidders":
      return <WaitingOtherBidders />;
    case "awatingAuction":
      return <AwaitingAution />;
    default:
      return (
        <div className="w-full h-screen bg-zinc-100 flex flex-col justify-between">
          <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
            <div>
              <p className=" font-bold">Awating Contract...</p>
            </div>
          </div>
        </div>
      );
  }
};

export default BidderViews;
