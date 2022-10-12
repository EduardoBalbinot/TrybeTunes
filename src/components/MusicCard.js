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
    const favorite = favoriteSongsObj.some((ft) => (ft.trackId === trackId));
    this.setState({
      favorite,
    });
  }

  favoriteChange = async (e) => {
    const { checked } = e.target;
    const { trackObj, afterRemove, setParentLoading } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(trackObj);
      this.setState({ loading: false, favorite: true });
    } else {
      setParentLoading(true);
      await removeSong(trackObj);
      this.setState({ loading: false, favorite: false });
      await afterRemove();
      setParentLoading(false);
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

MusicCard.defaultProps = {
  afterRemove: () => {},
  setParentLoading: () => {},
};

MusicCard.propTypes = {
  trackObj: shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favoriteSongs: PropTypes.string.isRequired,
  afterRemove: PropTypes.func,
  setParentLoading: PropTypes.func,
};

export default MusicCard;
