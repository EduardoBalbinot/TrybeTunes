import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  addToFavorites = async (e) => {
    const { checked } = e.target;
    const { trackObj } = this.props;
    if (checked) {
      this.setState({ loading: true });
      await addSong(trackObj);
      this.setState({ loading: false });
    }
  };

  render() {
    const { trackObj, checked } = this.props;
    const { trackName, previewUrl, trackId } = trackObj;
    const { loading } = this.state;
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
            checked={ checked }
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
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
