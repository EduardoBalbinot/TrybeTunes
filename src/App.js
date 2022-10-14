import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
