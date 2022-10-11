import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistSearch: '',
    loading: false,
    results: [],
    noResults: false,
  };

  searchClick = async () => {
    const { artistSearch } = this.state;
    this.setState({
      loading: true,
    });
    const results = await searchAlbumsAPI(artistSearch);
    this.setState({
      loading: false,
      results,
    });
    console.log(results);
    if (results.length === 0) this.setState({ noResults: true });
    else this.setState({ noResults: false });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artistSearch, loading, results, noResults } = this.state;
    const minSearchLenght = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          {
            loading
              ? <Loading />
              : (
                <div>
                  <input
                    data-testid="search-artist-input"
                    placeholder="Nome do Artista"
                    name="artistSearch"
                    onChange={ this.handleChange }
                  />
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    onClick={ this.searchClick }
                    disabled={ artistSearch.length < minSearchLenght }
                  >
                    Pesquisar
                  </button>
                </div>
              )
          }
        </form>
        {
          results.length > 0
            ? (
              <div>
                <p>{`Resultado de álbuns de: ${artistSearch}`}</p>
                {
                  results.map((r) => (
                    <div key={ r.collectionId }>
                      <img src={ r.artworkUrl100 } alt={ r.collectionName } />
                      <p>{ r.collectionName }</p>
                      <p>{ r.artistName }</p>
                      <Link
                        to={ `album/${r.collectionId}` }
                        data-testid={ `link-to-album-${r.collectionId}` }
                      >
                        Detalhes
                      </Link>
                    </div>
                  ))
                }
              </div>
            )
            : ''
        }
        {
          noResults
            ? <p>Nenhum álbum foi encontrado</p>
            : ''
        }
      </div>
    );
  }
}

export default Search;
