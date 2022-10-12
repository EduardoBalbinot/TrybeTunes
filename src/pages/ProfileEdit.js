import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './profileEdit.css';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    validated: false,
    infoSaved: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      loading: false,
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    }, () => {
      this.checkValidated();
    });
  }

  checkValidated = () => {
    const { name, email, description, image } = this.state;
    let validated = true;
    if (!name) validated = false;
    if (!email) validated = false;
    if (!description) validated = false;
    if (!image) validated = false;
    if (!email.includes('@')) validated = false;

    this.setState({
      validated,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.checkValidated();
    });
  };

  saveClick = async () => {
    const { name, email, description, image } = this.state;
    const updatedUser = {
      name,
      email,
      image,
      description,
    };
    this.setState({ loading: true });
    await updateUser(updatedUser);
    this.setState({ infoSaved: true });
  };

  render() {
    const { loading, name, email, description, image, validated, infoSaved } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Profile Edit</h1>
        {
          loading
            ? <Loading />
            : (
              <form className="editProfileForm">
                <label htmlFor="inputName">
                  Editar nome
                  <input
                    id="inputName"
                    name="name"
                    data-testid="edit-input-name"
                    type="text"
                    onChange={ this.handleChange }
                    value={ name }
                  />
                </label>
                <label htmlFor="inputEmail">
                  Editar email
                  <input
                    id="inputEmail"
                    name="email"
                    data-testid="edit-input-email"
                    type="email"
                    onChange={ this.handleChange }
                    value={ email }
                  />
                </label>
                <label htmlFor="inputDescricao">
                  Editar descrição
                  <textarea
                    id="inputDescricao"
                    data-testid="edit-input-description"
                    value={ description }
                    name="description"
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputImage">
                  Editar imagem
                  <input
                    id="inputImage"
                    data-testid="edit-input-image"
                    type="text"
                    onChange={ this.handleChange }
                    name="image"
                    value={ image }
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.saveClick }
                  disabled={ !validated }
                >
                  Salvar
                </button>
              </form>
            )
        }
        {
          (infoSaved && <Redirect to="/profile" />)
        }
      </div>
    );
  }
}

export default ProfileEdit;
