import React from 'react'
import Portis from '@portis/web3';
// import Web3 from 'web3';
import './App.css';
import { Link } from 'react-router-dom';

function SignIn() {
  const portis = new Portis('835530b2-c62e-4b03-86f0-5795ae704490', 'mainnet', {
    scope: ["email", "reputation"]
  })
  // const web3 = new Web3(portis.provider)

  // web3.eth.getAccounts((error, accounts) => {
  //   console.log("accounts ", accounts);
  // })
  
  portis.onLogin((walletAddress, email, reputation) => {
    console.log(walletAddress, email, reputation);
  });

  portis.isLoggedIn().then(({ error, result }) => {
    console.log(error, result);
  });  

  portis.onLogout(() => {
    console.log('User logged out');
  });
  

  return (
      <div className="App">
          <h1>
          <Link to="/" className="portis-button">Home</Link>
          </h1>
          <button className="portis-button" onClick={() => portis.provider.enable()} >Log in to portis</button>
          <button className="logout-button" onClick={() => portis.logout()} >Log Out</button>
          <button className="portis-button" onClick={() => portis.showBitcoinWallet("m/49'/0'/0'/0/0")} >Show Bitcoin Wallet</button>
          <button className="portis-button" onClick={() => portis.showPortis()} >Show Portis account</button>
          
      </div>
  )
}

export default SignIn
