import React from 'react';

import { startGame } from '../../auth/requests';

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
    if (selectedValue) {
      this.setState({
        loading: true
      });
      startGame(selectedValue)
        // .then((res) => {
        //   console.log(res);
        // })
        .finally(() => {
          this.setState({
            loading: false
          });
        });
    }
  }

  render() {
    const { selectedValue, loading } = this.state;

    return (
      <form className="difficultyForm" onSubmit={this.submitForm}>
        <h2>Select difficult</h2>
        <select id="difficulty-select" defaultValue="-" onChange={this.handleSelect}>
          <option value="-" disabled hidden>
            Choose difficulty
          </option>
          <option value="1">Easy</option>
          <option value="2">Hard</option>
        </select>
        <button className={`${selectedValue ? '' : 'disabled'}`} type="submit">
          {loading ? <div className="loader" /> : 'Login'}
        </button>
      </form>
    );
  }
}

export default Start;
