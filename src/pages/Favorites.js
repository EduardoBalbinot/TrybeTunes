import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favoriteSongs: '',
    favoriteSongsObj: [],
    loading: false,
  };

  async componentDidMount() {
    this.retrieveFavorites();
  }

  retrieveFavorites = async () => {
    const favoriteSongsObj = await getFavoriteSongs();
    const favoriteSongs = JSON.stringify(favoriteSongsObj);
    this.setState({
      favoriteSongs,
      favoriteSongsObj,
    });
  };

  setLoading = (isLoading) => {
    this.setState({
      loading: isLoading,
    });
  };

  render() {
    const { favoriteSongs, favoriteSongsObj, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {
          !loading
            ? (
              favoriteSongsObj.map((ft) => (
                <MusicCard
                  key={ ft.trackId }
                  trackObj={ ft }
                  favoriteSongs={ favoriteSongs }
                  afterRemove={ this.retrieveFavorites }
                  setParentLoading={ this.setLoading }
                />
              ))
            )
            : <Loading />
        }
      </div>
    );
  }
}

export default Favorites;
