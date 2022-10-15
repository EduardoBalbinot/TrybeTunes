import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import Logo from '../components/Logo';
import { createUser } from '../services/userAPI';
import './login.css';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    logged: false,
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  btnEntrarClick = async () => {
    const { nome } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nome });
    this.setState({ logged: true });
  };

  preventSubmit = (e) => {
    e.preventDefault();
    this.btnEntrarClick();
  };

  render() {
    const { nome, loading, logged } = this.state;
    const minNameLenght = 3;
    return (
      <div data-testid="page-login" onSubmit={ this.preventSubmit }>
        <form className="loginFormTunes" autoComplete="off">
          <Logo />
          <input
            id="nome"
            name="nome"
            type="text"
            className="inputLogin"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ nome.length < minNameLenght }
            onClick={ this.btnEntrarClick }
          >
            Entrar
          </button>
          {
            loading ? <Loading /> : ''
          }
          {
            logged ? <Redirect to="/search" /> : ''
          }
        </form>
      </div>
    );
  }
}

export default Login;
