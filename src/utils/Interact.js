import { pinJSONToIPFS } from './Pinata.js';
import metadata from '../metadata/metadata_005025.json';
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json');
const contractAddress = "0x1474C30C8997334f92072235BC31BE6eC7a90fc4";

// wallet connection
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      const obj = {
        status: '👇🏾 Input no. of tokens to mint',
        address: addressArray[0]
      };
      return obj;
    }
    catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      };
    }
  }
  else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            😿{' '}
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      )
    };
  }
};



// wallet info - incase of page refresh
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts'
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '👇🏾 Input no. of tokens to mint'
        };
      }
      else {
        return {
          address: '',
          status: '😿 Connect to Metamask using the top right button.'
        };
      }
    }
    catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message
      };
    }
  }
  else {
    return {
      status: (
        <span>
          <p>
            {' '}
            😿{' '}
            <a target="_blank" href={`https://metamask.io/download.html`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      )
    };
  }
};



// function to handle minting the nft
export const mintNFT = async () => {

  // -> make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;


  // -> load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);


  // -> set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI(), //make call to NFT smart contract 
    value: '186CC6ACD4B0000' // require address to pay 0.11 ethers <value encoded to hex>
  };

  
  // -> sign the transaction via Metamask
  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
    };
  }
  catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message
    };
  }
};