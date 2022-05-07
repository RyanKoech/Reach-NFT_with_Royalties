import React, {useContext} from "react";
import { MainAppContext } from "../../context/MainAppContext";


const exports = {}

exports.ConnectWallet = (obj) => {
  return (
    <div>Connect Wallet to Proceed</div>
  )
}

exports.ChooseRole = (obj) => {

  return (
    <div>
      <button onClick={obj.deployCreator}>Creator</button>
      <button onClick={obj.deployBidder}>Bidder</button>
    </div>
  )
}

exports.Loading = (obj) => {
  return(
    <div>PleaseWait...</div>
  )
}

const AppViews = (props) => {
  const {deployBidder, deployCreator} = useContext(MainAppContext)

  return (
    exports[props.view]({deployBidder, deployCreator})
  )
}

export default AppViews;