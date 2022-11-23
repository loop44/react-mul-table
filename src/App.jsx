import React from 'react';

import { pages } from './consts/pages';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: pages.LOGIN
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.setState({
      page
    });
  }

  render() {
    const { page } = this.state;
    switch (page) {
      case pages.LOGIN:
        return <Login changePage={this.changePage} />;
      case pages.REGISTER:
        return <Register changePage={this.changePage} />;
      case pages.GAME:
        return <p>Game</p>;

      default:
        break;
    }
  }
}

export default App;
