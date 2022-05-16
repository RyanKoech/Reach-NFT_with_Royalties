import React, { Component } from "react";

import {loadStdlib} from '@reach-sh/stdlib';
import * as Backend from '../../build/index.main.mjs'

import { MainAppContext } from "../../context/MainAppContext";
import BidderViews from "./BidderViews.js";

const Reach = loadStdlib('ALGO');

const fmt = (x) => Reach.formatCurrency(x, 4);


export class Bidder extends Component {
  static contextType = MainAppContext;
  
  constructor (props) {
    super(props);
    this.state = {
        appState: "attachContract",
        args: [],
        resGetBid: null,
        resIsAuctionOn: null,            
    };
    this.getBidRes = this.getBidRes.bind(this);
    this.isAuctionOnRes = this.isAuctionOnRes.bind(this);
    this.attachContract = this.attachContract.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(async () => await this.updateBalance(), 5000);        
  }


  async updateBalance() {        
    const {account, setAccountBal} = this.context;
    const balance = Reach.formatCurrency(await Reach.balanceOf(account), 4);
    setAccountBal(balance);
  }

  async seeOutcome (price, address){
    const addressFormat = Reach.formatAddress(address);
    this.setState({
      appState: "seeOutcome",
      args: [price, addressFormat]
    })
  }

  async showBid (bid){
    console.log("Bid: ", fmt(bid))
    this.setState({
      appState: "showBid",
      args: [bid],
    });
  }

  async informTimeout (){
    this.setState({
        appState: "informTimeout",
    });
  }

  async isAuctionOn (){
    const response = await new Promise (res => {
      this.setState({
          appState: "isAuctionOn",
          args: [],
          resIsAuctionOn: res,
      })
    });
    this.setState({
      appState: "awaitingFirstBidder"
    })
    return response;
  }

  isAuctionOnRes(res) {
    this.state.resIsAuctionOn(res);
  }

  async getBid(price){
    const bid = await new Promise(res => {
      this.setState({
          appState: "getBid",
          args: [price],
          resGetBid: res,
      });
      console.log("This is what res is: ", res)
    });
    console.log(`A bid of ${bid} has been placed.`)
    const parsedBid = Reach.parseCurrency(bid);
    this.setState({
      appState: "awatingOtherBidders"
    })
    return parsedBid;
  }

  getBidRes(bid){
    this.state.resGetBid(bid)
  }

  async attachContract(contractInfo){
    const {account} = this.context;
    const contract = account.contract(Backend, JSON.parse(contractInfo));
    Backend.Bidder(contract, this);
    console.log("Attacher ctc: " ,contract);
    this.setState({
      appState: "awatingAuction"
    })
  }


  render() {
    return (<BidderViews
      appState={this.state.appState}
      args={this.state.args}
      getBidReady={this.state.resGetBid !== null}
      getBid={this.getBidRes} 
      isAuctionOnReady={this.state.resIsAuctionOn !== null}
      isAuctionOn={this.isAuctionOnRes}
      attachContract={this.attachContract} />
  );  
  }
}