import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { trackObj } = this.props;
    const { trackId } = trackObj;
    const favoriteSongs = await getFavoriteSongs();
    const favorite = favoriteSongs.some((ft) => {
      console.log(ft.trackId, trackId);
      return ft.trackId === trackId;
    });
    this.setState({ favorite });
  }

  addToFavorites = async (e) => {
    const { checked } = e.target;
    const { trackObj } = this.props;
    if (checked) {
      this.setState({ loading: true });
      await addSong(trackObj);
      this.setState({ loading: false, favorite: true });
    } else this.setState({ favorite: false });
  };

  render() {
    const { trackObj } = this.props;
    const { trackName, previewUrl, trackId } = trackObj;
    const { loading, favorite } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `check_${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ `check_${trackId}` }
            onChange={ this.addToFavorites }
            checked={ favorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
        { loading ? <Loading /> : '' }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackObj: shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
