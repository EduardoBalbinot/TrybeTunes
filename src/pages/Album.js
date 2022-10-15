import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './album.css';

class Album extends React.Component {
  state = {
    album: [{
      artistName: '',
      collectionName: '',
    }],
    favoriteSongs: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const album = await getMusics(id);
    const favoriteSongsObj = await getFavoriteSongs();
    const favoriteSongs = JSON.stringify(favoriteSongsObj);
    this.setState({
      album,
      favoriteSongs,
    });
  }

  getHigherResCover = (coverLink) => {
    if (coverLink) {
      const lastCharacters = 11;
      let newLink = coverLink.substring(0, coverLink.length - lastCharacters);
      newLink += '800x800bb.jpg';
      return newLink;
    }
  };

  render() {
    const { album, favoriteSongs } = this.state;
    const { artistName, collectionName } = album[0];
    let highResCover = '';
    if (album[0].artistName) highResCover = this.getHigherResCover(album[0].artworkUrl60);
    return (
      <div data-testid="page-album" className="albumPage">
        <Header />
        <div className="albumInfo">
          <h1 data-testid="artist-name">{ artistName }</h1>
          <h2 data-testid="album-name">{ collectionName }</h2>
        </div>
        <img src={ highResCover } alt={ album[0].collectionName } className="albumImg" />
        <div className="tracksContainer">
          {
            album.map((track, i) => (
              i > 0
                ? (
                  <MusicCard
                    key={ track.trackId }
                    trackObj={ track }
                    favoriteSongs={ favoriteSongs }
                  />
                )
                : ''
            ))
          }
        </div>
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
