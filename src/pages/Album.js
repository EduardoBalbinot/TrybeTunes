import React from 'react';
import PropTypes from 'prop-types';

class Album extends React.Component {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    return (
      <div data-testid="page-album">
        <h1>
          Album
          { ` ${id}` }
        </h1>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};

export default Album;
