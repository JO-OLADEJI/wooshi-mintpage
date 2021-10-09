import React from 'react';
import styles from '../styles/Nav.module.css';
import logo from '../assets/wooshi-logo.png';

const Nav = (props) => {
  return (
    <div className={styles['nav']}>
      <div className={styles['social-links']}>
        <i className="fab fa-twitter" />
        <i className="fab fa-discord" />
        <i className="fab fa-instagram" />
      </div>
      <div className={styles['logo']}>
        <img 
          src={logo} 
          alt="wooshi world logo"
        />
      </div>
      <div className={styles['nav-btns']}>
        <button 
          className={styles['connect-btn']}
          onClick={async (e) => props.connectWallet(e)}>
          {props.walletAddress.length > 0 ? (
          <p>{"Connected: " +
          String(props.walletAddress).substring(0, 6) +
          "..." +
          String(props.walletAddress).substring(38)}
          </p>
        ) : (
          <>
            <p>Connect Wallet</p>
            <i className="fab fa-ethereum" />
          </>
        )}
        </button>
      </div>
    </div>
  );
}

export default Nav;