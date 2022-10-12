import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    console.log(user);
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {
          loading
            ? (<Loading />)
            : (
              <div>
                <img src={ user.image } alt={ user.name } data-testid="profile-image" />
                <p>{ user.name }</p>
                <p>{ user.email }</p>
                <p>{ user.description }</p>
                <Link to="profile/edit">Editar</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
