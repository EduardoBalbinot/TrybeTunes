import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './profile.css';

class Profile extends React.Component {
  state = {
    user: {},
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1 className="profileTitle">Perfil</h1>
        {
          loading
            ? (<Loading />)
            : (
              <div className="profileContainer">
                <img
                  src={ user.image
                    ? user.image
                    : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' }
                  alt={ user.name }
                  data-testid="profile-image"
                />
                <p>{ user.name }</p>
                <p>{ user.email }</p>
                <p>{ user.description }</p>
                <Link to="profile/edit" className="editProfileLink">Editar perfil</Link>
              </div>
            )
        }
      </div>
    );
  }
}

export default Profile;
