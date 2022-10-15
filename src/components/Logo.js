import React from 'react';
import logo from './logo.png';

class Logo extends React.Component {
  render() {
    return (
      <div className="logo">
        <img src={ logo } alt="logo" />
        <h1 className="logoTitle">Trybe Tunes.</h1>
      </div>
    );
  }
}

export default Logo;
