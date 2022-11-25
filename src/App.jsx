import React from 'react';

import { pages } from './consts/pages';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: pages.LOGIN
    };

    this.changePage = this.changePage.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('access_token')) {
      this.changePage(pages.GAME);
    }
  }

  changePage(page) {
    this.setState({
      page
    });
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.changePage(pages.LOGIN);
  }

  render() {
    const { page } = this.state;
    switch (page) {
      case pages.LOGIN:
        return <Login changePage={this.changePage} />;
      case pages.REGISTER:
        return <Register changePage={this.changePage} />;
      case pages.GAME:
        return <Game signOut={this.signOut} />;

      default:
        break;
    }
  }
}

export default App;
