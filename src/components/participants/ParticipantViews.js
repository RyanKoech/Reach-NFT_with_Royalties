import React from "react";

export const InformTimeout = () => {
  return (
    <div>Timeout was observed</div>
  )
}

export const SeeOutcome = ({price, address }) => { 
  return (
    <div>`${address} won the Auction and Paid ${price} ALGO`</div>
  )
}

export const ShowBid = ({bid}) => {
  return (
    <div>`A bid of ${bid} has been placed by someone else`</div>
  )
}

export const IsAuctionOn = ({isAuctionOn}) => {
  const handleReject = () => {
    return isAuctionOn(false)
  }
  const handleAccept = () => {
    return isAuctionOn(true)
  }

  return(
    <div>
      <p>Wanna Start?</p>
      <button onClick={handleAccept}>Yes</button>
      <button onClick={handleReject}>No</button>
    </div>
  );
}