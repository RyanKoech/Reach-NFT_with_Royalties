import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { loadStdlib } from "@reach-sh/stdlib";
import {
  InformTimeout,
  SeeOutcome,
  ShowBid,
  IsAuctionOn,
  AwaitingFirstBidder,
} from "./ParticipantViews";

const Reach = loadStdlib("ALGO");

const CreateNFT = ({ deployContract }) => {
  const [basePrice, setBasePrice] = useState();
  const [royalty, setRoyalty] = useState();
  const [metaData, setMetaData] = useState();
  const [nftId, setNftId] = useState();

  const handleSubmit = () => {
    deployContract(
      {
        basePrice: Reach.parseCurrency(basePrice),
        royalty,
        uri: metaData,
      },
      nftId
    );
  };

  return (
    <div className="antaliased">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col space-y-6 bg-cyan-700 w-50% maw-w-4xl p-8 rounded-xl shadow-lg teal-white">
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">
                Welocme to the creator side
              </h1>
              <p className="pt-2 text-cyan-100 text-sm">Start</p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-8 ">
              <form action="" className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="" className="tet-sm">
                    ID
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Your ID"
                    className="ring-1 ring-gray-500 w-full rounded-md px-4 py-2 outline-none mt-2 focus:ring-2 focus:ring-teal-300"
                    min={100}
                    step="1"
                    onChange={(e) => {
                      setNftId(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="" className="tet-sm">
                    BasePrice
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Base price"
                    className="ring-1 ring-gray-500 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    min={0.001}
                    step="0.001"
                    onChange={(e) => {
                      setBasePrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="" className="tet-sm">
                    Royalty
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Royalty"
                    className="ring-1 ring-gray-500 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    min={0}
                    step="0.1"
                    max={49}
                    onChange={(e) => {
                      setRoyalty(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="" className="tet-sm">
                    Metadata
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Metadata"
                    className="ring-1 ring-gray-500 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-teal-300"
                    onChange={(e) => {
                      setMetaData(e.target.value);
                    }}
                  />
                </div>
              </form>
              <div>
                <button
                  className="inline-blovk self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowContractInfo = ({ contractInfo, setHasShownContractInfo }) => {
  const [copied, setCopied] = useState();
  const handleCopy = () => {
    setCopied(true);
  };

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <div className="flex flex-col space-y-6 bg-cyan-700 w-50% maw-w-4xl p-8 rounded-xl shadow-lg teal-white">
        <div>
          <pre className="mt-4 p-4">{contractInfo}</pre>
        </div>

        <div>
          <div>
            <CopyToClipboard onCopy={handleCopy} text={contractInfo}>
              <button
                className="inline-blovk self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
                variant="primary"
              >
                {copied ? "Copied" : "Copy to clipboard"}
              </button>
            </CopyToClipboard>
          </div>

          <div>
            <button
              className="inline-blovk self-end bg-cyan-700 text-white font-bold rounded-lg px-6 py-2 uppercase text-sm"
              onClick={setHasShownContractInfo}
            >
              Continue to Begin Auction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatorViews = ({
  appState,
  isAuctionOn,
  deployContract,
  args,
  hasShownContractInfo,
}) => {
  console.log("AppView: ", appState);
  switch (appState) {
    case "createNFT":
      return <CreateNFT deployContract={deployContract}></CreateNFT>;
    case "informTimeout":
      return <InformTimeout />;
    case "seeOutcome":
      return <SeeOutcome price={args[0]} address={args[1]} />;
    case "showBid":
      return <ShowBid bid={args[0]} />;
    case "isAuctionOn":
      return hasShownContractInfo ? (
        <IsAuctionOn isAuctionOn={isAuctionOn} />
      ) : (
        <ShowContractInfo
          contractInfo={args[0]}
          setHasShownContractInfo={args[1]}
        />
      );
    case "awaitingFirstBidder":
      return <AwaitingFirstBidder />;
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

export default CreatorViews;
