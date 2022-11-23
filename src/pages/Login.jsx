import React from 'react';

import validateField from '../auth/validateField';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      emailDirty: false,
      passwordDirty: false,
      formValid: false
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.blurUserInput = this.blurUserInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleUserInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      validateField(name, value, this);
    });
  }

  blurUserInput(e) {
    const { name, value } = e.target;
    validateField(name, value, this);
    this.setState({
      [`${name}Dirty`]: true
    });
  }

  validateForm() {
    const { emailValid, passwordValid } = this.state;
    this.setState({ formValid: emailValid && passwordValid });
  }

  submitForm(e) {
    e.preventDefault();
  }

  render() {
    const { email, password, formErrors, emailDirty, passwordDirty, formValid } = this.state;

    return (
      <form className="login" onSubmit={this.submitForm}>
        <h2>Login to account</h2>
        <div className={emailDirty && formErrors.email ? 'error input-block' : 'input-block'}>
          <p className="validation-error">{emailDirty && formErrors.email}</p>
          <input
            value={email}
            onChange={this.handleUserInput}
            onBlur={this.blurUserInput}
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="on"
          />
        </div>
        <div className={passwordDirty && formErrors.password ? 'error input-block' : 'input-block'}>
          <p className="validation-error">{passwordDirty && formErrors.password}</p>
          <input
            className={passwordDirty && formErrors.password ? 'error' : ''}
            value={password}
            onChange={this.handleUserInput}
            onBlur={this.blurUserInput}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
        </div>
        <button className={!formValid ? 'error' : ''} type="submit">
          Login
        </button>
        <p className="changeAuthMethod">
          Need an account? <button>Register</button>
        </p>
      </form>
    );
  }
}

export default Login;
