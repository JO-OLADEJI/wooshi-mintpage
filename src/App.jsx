import React from 'react';
import styles from './App.module.css';
import Nav from './components/Nav.jsx';
import Minter from './components/Minter.jsx';

function App() {
  return (
    <div className={styles['App']}>
      <Nav />
      <Minter />
    </div>
  );
}

export default App;
