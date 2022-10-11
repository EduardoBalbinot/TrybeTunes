import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistSearch: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artistSearch } = this.state;
    const minSearchLenght = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            name="artistSearch"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistSearch.length < minSearchLenght }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
