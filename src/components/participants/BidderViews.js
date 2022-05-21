import React, { useState } from "react";
import {loadStdlib} from '@reach-sh/stdlib';
import { InformTimeout, SeeOutcome, ShowBid, IsAuctionOn, AwaitingFirstBidder } from "./ParticipantViews";

const Reach = loadStdlib('ALGO');

const fmt = (x) => Reach.formatCurrency(x, 4);

const GetBid = ({price, getBid}) =>{

  const formatPrice = fmt(price);
  const [bid, setBid] = useState(0);
  const handleSubmit = () => {
    getBid(bid);
  }
  return (
    <div>
      <p>{formatPrice}</p>
      <label htmlFor="">Bid (Price {formatPrice})</label>
      <input type="number" step={1} min={formatPrice} onChange={(e)=>{setBid(e.target.value)}}/>
      <button className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg " onClick={handleSubmit}>Bid</button> 
    </div>
  )
}

const AttachContract = ({attachContract}) => {

  const [contractInfo, setContractInfo] = useState("");

  const handleSubmit = () => {
   attachContract(contractInfo);
  }
  return (
    <div className="antialised bg-zinc-200 ">
      <div className="flex w-full min-h-screen justify-center items-center">
        <div className="flex flex-col  md:space-y-6 space-y-6 md:space-x-0  bg-cyan-600 w-full max-w-4xl p-10 mt-6 rounded-xl shadow-lg text-white items-center">
          <div >
            <textarea name="" id="" cols="30" rows="10" class="ring-1 ring-gray-300 rounded-md px-4 py-2 mt-2 outline-none text-black" onChange={(e)=>{setContractInfo(e.target.value)}}></textarea>
            <button className="py-3 px-6 sm:w-[50%] my-4 flex bg-cyan-700 text-white font-bold rounded-lg " onClick={handleSubmit}>Attach</button>
          </div>
        
        </div>
      
      </div>
      
    </div>
    
  )
}

const  WaitingOtherBidders = () => {
  return (
    <div>Please waiting. Placing bid...</div>
  )
}

const AwaitingAution = () => {
  return(
    <div>Waiting for Auction to Begin....</div>
  )
}

const BidderViews = ({appState, args, getBidReady, isAcutionOnReady, isAuctionOn, attachContract, getBid}) => {
  console.log("AppView: ", appState);
  switch (appState){
    case "attachContract":
      return (<AttachContract attachContract={attachContract}></AttachContract>)
    case "getBid":
      return (<GetBid price={args[0]} getBid={getBid}></GetBid>)
    case "informTimeout":
      return (<InformTimeout />);
    case "seeOutcome":
      return (<SeeOutcome price ={args[0]} address={args[1]} />);
    case "showBid":
      return <ShowBid bid ={args[0]} />; 
    case "isAuctionOn":
      return (<IsAuctionOn isAuctionOn={isAuctionOn}/>)
    case "awaitingFirstBidder":
      return (<AwaitingFirstBidder/>)
    case "awatingOtherBidders":
      return (<WaitingOtherBidders/>)
    case "awatingAuction":
      return (<AwaitingAution/>)
    default:
      return (
        <div>Waiting Contract...</div>
      )
  }
}

export default BidderViews;