import React from 'react';

import { gamePages } from '../../consts/gamePages';

import Start from './Start';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: gamePages.START
    };
  }

  render() {
    const { page } = this.state;

    switch (page) {
      case gamePages.START:
        return <Start />;
      case gamePages.GAME:
        return <h1>Game itself</h1>;
      case gamePages.RESULTS:
        return <h1>Game results</h1>;

      default:
        break;
    }
  }
}

export default Game;
