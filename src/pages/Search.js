import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';

class Search extends React.Component {
  state = {
    artistSearch: '',
    lastArtistSearch: '',
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
      lastArtistSearch: artistSearch,
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

  preventSubmit = (e) => {
    e.preventDefault();
    this.searchClick();
  };

  render() {
    const { artistSearch, loading, results, noResults, lastArtistSearch } = this.state;
    const minSearchLenght = 2;
    return (
      <div data-testid="page-search" className="searchPage">
        <Header clName="headerTunesTransparent" />
        <form className="searchForm" autoComplete="off" onSubmit={ this.preventSubmit }>
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
                <p
                  className="resTitle"
                >
                  {`Resultado de álbuns de: ${lastArtistSearch}`}
                </p>
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
            ? <p className="noResults">Nenhum álbum foi encontrado</p>
            : ''
        }
      </div>
    );
  }
}

export default Search;
