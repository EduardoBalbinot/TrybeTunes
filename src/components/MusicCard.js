import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    const { trackObj, favoriteSongs } = this.props;
    const { trackId } = trackObj;
    const favoriteSongsObj = JSON.parse(favoriteSongs);
    const favorite = favoriteSongsObj.some((ft) => {
      console.log(ft.trackId, trackId);
      return ft.trackId === trackId;
    });
    this.setState({ favorite });
  }

  favoriteChange = async (e) => {
    const { checked } = e.target;
    const { trackObj } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(trackObj);
      this.setState({ loading: false, favorite: true });
    } else {
      await removeSong(trackObj);
      this.setState({ loading: false, favorite: false });
    }
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
            onChange={ this.favoriteChange }
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
  favoriteSongs: PropTypes.string.isRequired,
};

export default MusicCard;
