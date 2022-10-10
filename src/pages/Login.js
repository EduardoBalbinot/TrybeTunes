import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

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

  render() {
    const { nome, loading, logged } = this.state;
    const minNameLenght = 3;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="nome">
            Nome
            <input
              id="nome"
              name="nome"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ nome.length < minNameLenght }
            onClick={ this.btnEntrarClick }
          >
            Entrar
          </button>
          {
            loading ? <p>Carregando...</p> : ''
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
