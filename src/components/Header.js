import React from 'react';
import { getUser } from '../services/userAPI';

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
    const { name } = user;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ loading ? 'Carregando...' : name }</p>
      </header>
    );
  }
}

export default Header;
