import React from "react";
import { loadStdlib } from "@reach-sh/stdlib";

const Reach = loadStdlib('ALGO');

const fmt = (x) => Reach.formatCurrency(x, 4);

export const InformTimeout = () => {
  return (
    <div>Timeout was observed</div>
  )
}

export const SeeOutcome = ({price, address }) => { 
  const formatAddress = Reach.formatAddress(address)
  const formatPrice = fmt(price)
  return (
    <div>`{formatAddress} won the Auction and Paid {formatPrice} ALGO`</div>
  )
}

export const ShowBid = ({bid}) => {
  const formatBid = fmt(bid);
  return (
    <div>`Current leading  bid is {formatBid} ALGO. Waiting for next bidder...`</div>
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

export const AwaitingFirstBidder = () => {
  return (
    <div>Waiting for the First Bidder...</div>
  )
}