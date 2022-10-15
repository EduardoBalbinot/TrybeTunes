import React from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';

class Logo extends React.Component {
  render() {
    const { clName } = this.props;
    return (
      <div className={ clName }>
        <img src={ logo } alt="logo" />
        <h1 className="logoTitle">Trybe Tunes.</h1>
      </div>
    );
  }
}

Logo.propTypes = {
  clName: PropTypes.string.isRequired,
};

export default Logo;
