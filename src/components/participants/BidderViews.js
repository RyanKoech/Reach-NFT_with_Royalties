import React, { useState } from "react";
import {loadStdlib} from '@reach-sh/stdlib';
import { InformTimeout, SeeOutcome, ShowBid, IsAuctionOn } from "./ParticipantViews";

const Reach = loadStdlib('ALGO');

const GetBid = ({price}) =>{

  const [bid, setBid] = useState(0);
  const handleSubmit = () => {
  }
  return (
    <div>
      <p>{price}</p>
      <label htmlFor="">Bid (Price {price})</label>
      <input type="number" step={1} min={price} onChange={(e)=>{setBid(e.target.value)}}/>
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

const BidderViews = ({appState, args, getBidReady, isAcutionOnReady, isAuctionOn, attachContract}) => {
  console.log("AppView: ", appState);
  switch (appState){
    case "attachContract":
      return (<AttachContract attachContract={attachContract}></AttachContract>)
    case "getBid":
      return getBidReady
        ? (<GetBid price={args[0]}></GetBid>)
        : (<div>Waiting isGetBidReady...</div>)
    case "informTimeout":
      return (<InformTimeout />);
    case "seeOutcome":
      return (<SeeOutcome price ={args[0]} address={args[1]} />);
    case "showBid":
      return <ShowBid bid ={args[0]} />; 
    case "isAuctionOn":
      return (
        isAcutionOnReady 
          ? <IsAuctionOn isAuctionOn={isAuctionOn}/>
          : <div>Waiting isAuctionReady....</div>
      )
    default:
      return (
        <div>Waiting Contract...</div>
      )
  }
}

export default BidderViews;