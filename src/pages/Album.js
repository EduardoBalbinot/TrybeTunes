import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    album: [{
      artistName: '',
      collectionName: '',
    }],
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const album = await getMusics(id);
    this.setState({
      album,
    });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
    console.log(favoriteSongs);
  }

  render() {
    const { album } = this.state;
    const { artistName, collectionName } = album[0];
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ collectionName }</h2>
        {
          album.map((track, i) => (
            i > 0
              ? (
                <MusicCard
                  key={ track.trackId }
                  trackObj={ track }
                  checked={ favoriteSongs.some((ft) => ft.trackId === track.trackId) }
                />
              )
              : ''
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
