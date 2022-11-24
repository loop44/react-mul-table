import React from 'react';

import { setAnswer } from '../../auth/requests';
import { gamePages } from '../../consts/gamePages';

class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.gameData.time ? props.gameData.time : 0,
      inputValue: '',
      loading: false
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.submmitAnswer = this.submmitAnswer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const { gameData } = this.props;
      this.setState(
        {
          timeLeft: gameData.time
        },
        () => {
          this.startTimer();
        }
      );
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleInput(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  submmitAnswer(e) {
    e.preventDefault();
    const { gameData, setGameData } = this.props;
    const { inputValue } = this.state;

    this.setState({
      loading: true
    });

    this.stopTimer();

    setAnswer({
      value: e.type === 'click' ? e.currentTarget.innerText : inputValue,
      difficult: gameData.difficult
    })
      .then((res) => {
        const { status, type, data } = res;
        if (status && type === 'game') {
          setGameData({
            difficult: gameData.difficult,
            ...data
          });
        }
      })
      .catch((err) => {
        alert(err);
        this.startTimer();
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  startTimer() {
    this.timer = setInterval(() => {
      const { timeLeft } = this.state;

      if (timeLeft === 1) {
        this.stopTimer();
      }

      this.setState({
        timeLeft: timeLeft - 1
      });
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  render() {
    const { timeLeft, inputValue, loading } = this.state;
    const { gameData, changeGamePage } = this.props;
    const { options, points, question, questions } = gameData;

    if (questions) {
      return <h1>Game over</h1>;
    }

    return (
      <div className="playground">
        <p>
          Score: <span>{points}</span>
        </p>
        <p>
          Timer: <span>{timeLeft}</span>
        </p>
        <p>{question} = ?</p>
        {options.length > 0 ? (
          <div className="options">
            {options.map((option) => (
              <button
                className={`${loading ? 'loading' : ''} `}
                key={option}
                type="button"
                onClick={this.submmitAnswer}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <form className="playgroundInput" onSubmit={this.submmitAnswer}>
            <input type="number" onChange={this.handleInput} />
            <button
              className={`${inputValue ? '' : 'disabled'} ${loading ? 'loading' : ''}`}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
        <button type="button" onClick={() => changeGamePage(gamePages.START)}>
          Go Back
        </button>
      </div>
    );
  }
}

export default Playground;