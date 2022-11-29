import React from 'react';

import startGame from '../auth/requests';
import { reqTypes } from '../consts/reqTypes';
import { AuthContext } from '../hoc/AuthProvider';
import { withRouter } from '../hoc/withRouter';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: false,
      loading: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleSelect(e) {
    this.setState({
      selectedValue: e.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { selectedValue } = this.state;
    const { setGameData, navigate } = this.props;

    if (selectedValue) {
      this.setState({
        loading: true
      });
      startGame(selectedValue, reqTypes.GAME_START)
        .then((res) => {
          const { status, type, data } = res;

          if (status && type === 'start') {
            setGameData({
              difficult: selectedValue,
              ...data
            });
            navigate('/game');
          }
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  render() {
    const { selectedValue, loading } = this.state;
    const { signout } = this.context;
    return (
      <form className="difficultyForm" onSubmit={this.submitForm}>
        <h2>Select difficult</h2>
        <select id="difficulty-select" defaultValue="-" onChange={this.handleSelect}>
          <option value="-" disabled hidden>
            Choose difficult
          </option>
          <option value="1">Easy</option>
          <option value="2">Hard</option>
        </select>
        <button className={`${selectedValue ? '' : 'disabled'}`} type="submit">
          {loading ? <div className="loader" /> : 'Start'}
        </button>
        <svg
          onClick={() => signout()}
          className="logOut"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 17L21 12M21 12L16 7M21 12H9M12 17C12 17.93 12 18.395 11.8978 18.7765C11.6204 19.8117 10.8117 20.6204 9.77646 20.8978C9.39496 21 8.92997 21 8 21H7.5C6.10218 21 5.40326 21 4.85195 20.7716C4.11687 20.4672 3.53284 19.8831 3.22836 19.1481C3 18.5967 3 17.8978 3 16.5V7.5C3 6.10217 3 5.40326 3.22836 4.85195C3.53284 4.11687 4.11687 3.53284 4.85195 3.22836C5.40326 3 6.10218 3 7.5 3H8C8.92997 3 9.39496 3 9.77646 3.10222C10.8117 3.37962 11.6204 4.18827 11.8978 5.22354C12 5.60504 12 6.07003 12 7"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </form>
    );
  }
}

Start.contextType = AuthContext;

export default withRouter(Start);
