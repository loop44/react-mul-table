import React from 'react';

import { gamePages } from '../../consts/gamePages';

import Playground from './Playground';
import Start from './Start';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: gamePages.START,
      gameData: null
    };

    this.setGameData = this.setGameData.bind(this);
    this.changeGamePage = this.changeGamePage.bind(this);
  }

  setGameData(data) {
    this.setState({
      gameData: data
    });
  }

  changeGamePage(page) {
    this.setState({
      page
    });
  }

  render() {
    const { page, gameData } = this.state;

    switch (page) {
      case gamePages.START:
        return <Start setGameData={this.setGameData} changeGamePage={this.changeGamePage} />;
      case gamePages.GAME:
        return (
          <Playground
            setGameData={this.setGameData}
            changeGamePage={this.changeGamePage}
            gameData={gameData}
          />
        );
      case gamePages.RESULTS:
        return <h1>Game results</h1>;

      default:
        break;
    }
  }
}

export default Game;
