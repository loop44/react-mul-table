import React from 'react';
import { Link } from 'react-router-dom';

import setAnswer from '../auth/requests';
import { reqTypes } from '../consts/reqTypes';
import { withRouter } from '../hoc/withRouter';

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

    setAnswer(
      {
        value: e.type === 'click' ? e.currentTarget.innerText : inputValue,
        difficult: gameData.difficult
      },
      reqTypes.GAME_ANSWER
    )
      .then((res) => {
        const { status, type, data } = res;
        const { navigate } = this.props;

        if (status && type === 'game') {
          setGameData({
            difficult: gameData.difficult,
            ...data
          });
        }

        if (data?.questions) {
          navigate('/result');
        }
      })
      .catch((err) => {
        alert(err.message);
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
    const { gameData } = this.props;
    const { options, points, question, questions } = gameData;

    if (questions) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <Link to="/">
            <button type="button">Play again</button>
          </Link>
        </div>
      );
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
        <Link to="/">
          <button type="button">Go Back</button>
        </Link>
      </div>
    );
  }
}

export default withRouter(Playground);
