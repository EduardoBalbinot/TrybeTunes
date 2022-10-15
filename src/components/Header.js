import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import Logo from './Logo';

class Header extends React.Component {
  state = {
    user: {},
    loading: true,
  };

  componentDidMount() {
    getUser()
      .then((user) => {
        this.setState({
          user,
          loading: false,
        });
      });
  }

  render() {
    const { user, loading } = this.state;
    const { clName } = this.props;
    const { name } = user;
    return (
      <header data-testid="header-component" className={ clName }>
        <div className="headerContent">
          <div className="userInfo">
            <img
              src={ user.image
                ? user.image
                : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' }
              alt={ user.name }
              className="userImage"
            />
            { loading ? <Loading /> : <h1 data-testid="header-user-name">{ name }</h1> }
          </div>
          <Logo clName="smallLogo" />
        </div>
        <div className="headerMenu">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="pageLink"
          >
            Pesquisar
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="pageLink"
          >
            Favoritos
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="pageLink"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

Header.defaultProps = {
  clName: 'headerTunes',
};

Header.propTypes = {
  clName: PropTypes.string,
};

export default Header;
