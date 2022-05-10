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
      <button onClick={handleSubmit}>Bid</button> 
    </div>
  )
}

const AttachContract = ({attachContract}) => {

  const [contractInfo, setContractInfo] = useState("");

  const handleSubmit = () => {
   attachContract(contractInfo);
  }
  return (
    <div>
      <textarea name="" id="" cols="30" rows="10" onChange={(e)=>{setContractInfo(e.target.value)}}></textarea>
      <button onClick={handleSubmit}>Attach</button>
    </div>
    
  )
}

const  WaitingOtherBidders = () => {
  return (
    <div>Please waiting. Placing bid...</div>
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
    default:
      return (
        <div>Waiting Contract...</div>
      )
  }
}

export default BidderViews;