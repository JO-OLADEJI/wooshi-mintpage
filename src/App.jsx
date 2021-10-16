import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Nav from './components/Nav.jsx';
import Minter from './components/Minter.jsx';
import { connectWallet, getCurrentWalletConnected, mintNFT } from './utils/Interact.js';

function App() {
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');

  // listeners
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }



  // functions
  useEffect(() => {
    const getWalletInfo = async () => {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getWalletInfo();
    addWalletListener();
  }, []);

  const connectWalletPressed = async (event) => {
    event.preventDefault();
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const mintBtnPressed = async (event, mintAmount) => {
    event.preventDefault();
    const result = await mintNFT(mintAmount);
    result.success ? setStatus('Mint successful ✔') : setStatus('An error occured ❌');
  }



  return (
    <div className={styles['App']}>
      <Nav
        walletAddress={walletAddress}
        connectWallet={connectWalletPressed}
      />
      <Minter
        mintNFT={mintBtnPressed}
        warning={status}
      />
    </div>
  );
}

export default App;
