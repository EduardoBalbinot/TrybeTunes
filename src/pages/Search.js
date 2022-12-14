import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';

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
      <div data-testid="page-search" className="searchPage">
        <Header />
        <form className="searchForm" autoComplete="off">
          {
            loading
              ? <Loading />
              : (
                <div className="searchBar">
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
              <>
                <p className="resTitle">{`Resultado de álbuns de: ${artistSearch}`}</p>
                <div className="results">
                  {
                    results.map((r) => (
                      <div key={ r.collectionId } className="resultCard">
                        <img src={ r.artworkUrl100 } alt={ r.collectionName } />
                        <p>{ r.collectionName }</p>
                        <p>{ r.artistName }</p>
                        <Link
                          to={ `album/${r.collectionId}` }
                          data-testid={ `link-to-album-${r.collectionId}` }
                          className="resultLink"
                        >
                          Detalhes
                        </Link>
                      </div>
                    ))
                  }
                </div>
              </>
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
