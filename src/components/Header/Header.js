import React from 'react';
import './Header.css';
import HeaderModal from './HeaderModal';

const Header = () => {


  return (
    <div className='header'>
        <h1>Secrets</h1>
        <HeaderModal />
    </div>
  )
}

export default Header