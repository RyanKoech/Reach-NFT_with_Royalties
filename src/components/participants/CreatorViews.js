import React, { useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {loadStdlib} from '@reach-sh/stdlib';
import { InformTimeout, SeeOutcome, ShowBid, IsAuctionOn, AwaitingFirstBidder } from "./ParticipantViews";

const Reach = loadStdlib('ALGO');

const CreateNFT = ({deployContract}) => {

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
    </div>
  )
}

const ShowContractInfo = ({contractInfo, setHasShownContractInfo}) => {

  const [copied, setCopied] = useState();
  const handleCopy = () => { setCopied(true) };

  return(
    <div>
      <pre className="mt-4 p-4">
        {contractInfo}
      </pre>
      <CopyToClipboard onCopy={handleCopy} text={contractInfo}>
          <button variant="primary">
              {copied ? "Copied" : "Copy to clipboard"}
          </button>
      </CopyToClipboard>
      <div><button onClick={setHasShownContractInfo}>Continue to Begin Auction</button></div>
    </div>
  )
}

const CreatorViews = ({appState, isAuctionOn, deployContract, args, hasShownContractInfo}) => {
  console.log("AppView: ", appState);
  switch (appState){
    case "createNFT":
      return (<CreateNFT deployContract={deployContract}></CreateNFT>)
    case "informTimeout":
      return (<InformTimeout />);
    case "seeOutcome":
      return (<SeeOutcome price ={args[0]} address={args[1]} />);
    case "showBid":
      return <ShowBid bid ={args[0]} />; 
    case "isAuctionOn":
      return ( hasShownContractInfo 
        ? <IsAuctionOn isAuctionOn={isAuctionOn}/>
        : <ShowContractInfo contractInfo={args[0]} setHasShownContractInfo={args[1]}/>)
    case "awaitingFirstBidder":
      return (<AwaitingFirstBidder/>)
    default:
      return (
        <div>Waiting Contract...</div>
      )
  }
}

export default CreatorViews;