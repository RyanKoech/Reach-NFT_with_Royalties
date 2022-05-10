import React, { Component } from "react";

import {loadStdlib} from '@reach-sh/stdlib';
import * as Backend from '../../build/index.main.mjs'

import { MainAppContext } from "../../context/MainAppContext";
import CreatorViews from "./CreatorViews";


const Reach = loadStdlib('ALGO');


const fmt = (x) => Reach.formatCurrency(x, 4);


export class Creator extends Component {
  static contextType = MainAppContext;
  
  constructor(props) {
    super(props);
    this.nftTemplate = {};
    this.nftId = 1;
    this.state = {
        appState: "createNFT",
        args: [""],
        resIsAuctionOn: null
    }
    this.deployContract = this.deployContract.bind(this);
    this.isAuctionOnRes = this.isAuctionOnRes.bind(this);
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

  async createNFT (){
    return this.nftTemplate;
  }

  isAuctionOnRes(res) {
    this.state.resIsAuctionOn(res);
  }

  async deployContract(nftTemplate, nftId){

    this.nftTemplate = nftTemplate;
    this.getId = nftId;
    this.deadline = 500;

    console.log(this.nftId, this.nftTemplate)

    const {account} = this.context;
    const contract = account.contract(Backend);
    console.log(account)
    console.log(contract);
    Backend.Creator(contract, this);
    const contractInfo = JSON.stringify(await contract.getInfo(), null, 2);

    this.setState({
      args: [contractInfo]
    })

    console.log("Info: ", contractInfo);

  }

  render() {
    return (
      <CreatorViews
            appState={this.state.appState}   
            args={this.state.args}               
            isAuctionOnReady={this.state.resIsAuctionOn !== null}
            isAuctionOn={this.isAuctionOnRes}
            deployContract={this.deployContract}
        />
    )
  }
}