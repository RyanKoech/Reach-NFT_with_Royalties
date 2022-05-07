import React, { useState } from "react";
import {loadStdlib} from '@reach-sh/stdlib';
import { InformTimeout, SeeOutcome, ShowBid, IsAuctionOn } from "./ParticipantViews";

const Reach = loadStdlib('ALGO');

const CreateNFT = ({deployContract, contractInfo}) => {
  const [basePrice, setBasePrice] = useState();
  const [royalty, setRoyalty] = useState();
  const [metaData, setMetaData] = useState();
  const [nftId, setNftId] = useState();

  const handleSubmit = () => {
    deployContract({
      basePrice: Reach.parseCurrency(basePrice), 
      royalty,
      uri: metaData
    }, nftId);
  }

  return(
    <div>
      <form action="">
        <label htmlFor="">ID</label>
        <input type="number" min={100} step="1" onChange={(e)=>{setNftId(e.target.value)}}/>
        <label htmlFor="">BasePrice</label>
        <input type="number" min={0.001} step="0.001" onChange={(e)=>{setBasePrice(e.target.value)}}/>
        <label htmlFor="">Royalty</label>
        <input type="number" min={0} step="0.1" max={49} onChange={(e)=>{setRoyalty(e.target.value)}}/>
        <label htmlFor="">Metadata</label>
        <input type="text" onChange={(e)=>{setMetaData(e.target.value)}}/>
      </form>
      <button onClick={handleSubmit}>Create</button>
      <pre>
        {contractInfo}
      </pre>
    </div>
  )
}

const CreatorViews = ({appState, isAcutionOnReady, isAuctionOn, deployContract, args}) => {
  console.log("AppView: ", appState);
  switch (appState){
    case "createNFT":
      return (<CreateNFT deployContract={deployContract} contractInfo={args[0]}></CreateNFT>)
    case "informTimeout":
      return (<InformTimeout />);
    case "seeOutcome":
      return (<SeeOutcome price ={args[0]} address={args[1]} />);
    case "showBid":
      return <ShowBid bid ={args[0]} />; 
    case "isAuctionOn":
      return (
        true 
          ? <IsAuctionOn isAuctionOn={isAuctionOn}/>
          : <div>Waiting isAuctionReady....</div>
      )
    default:
      return (
        <div>Waiting Contract...</div>
      )
  }
}

export default CreatorViews;