import React, { useState } from 'react';
import styles from '../styles/Minter.module.css';
import wooshiGif from '../assets/wooshi-gif.gif';

const Minter = (props) => {
  const [mintAmount, setMintAmount] = useState(1);

  const mintAmountInputHandler = (event) => {
    if (parseInt(event.target.value) < 0) {
      setMintAmount(1);
    }
    else if (parseInt(event.target.value) > 20) {
      setMintAmount(20);
    }
    else {
      setMintAmount(() => parseInt(event.target.value));
    }
  }

  return (
    <div className={styles['minter']}>
      <h1>Mint-a-wooshi</h1>
      <img 
        className={styles['gif']}
        src={wooshiGif} 
        alt="a gif of a yellow wooshi"
      />
      <p className={styles['count']}>0/11111</p>
      <div className={styles['input-space']}>
        <div className={styles['warning']}>{props.warning}</div>
        <input 
          type="number" 
          min="1" 
          max="20" 
          step="1"
          value={mintAmount}
          onChange={(e) => mintAmountInputHandler(e)}
        />
        <p>PRICE: 0.11 + GAS - MAX 20 PER TX</p>
      </div>
      <button 
        className={styles['mint-btn']}
        onClick={async (e) => {
          e.preventDefault();
          console.log(`minting ${mintAmount} tokens . . .`);
          // await props.mintNFT(e, mintAmount);
        }}>
        MINT
      </button>
      <div className={styles['fake-footer']} />
    </div>
  );
}

export default Minter;