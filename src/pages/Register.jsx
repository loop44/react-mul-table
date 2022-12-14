import React from 'react';
import { Link } from 'react-router-dom';

import registerUser from '../auth/requests';
import validateField from '../auth/validateField';
import { reqTypes } from '../consts/reqTypes';
import { withRouter } from '../hoc/withRouter';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      formErrors: { name: '', email: '', password: '', passwordConfirm: '' },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordConfirmValid: false,
      nameDirty: false,
      emailDirty: false,
      passwordDirty: false,
      formValid: false,
      loading: false
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
    if (name !== 'passwordConfirm') {
      this.setState({
        [`${name}Dirty`]: true
      });
    }
  }

  validateForm() {
    const { nameValid, emailValid, passwordValid, passwordConfirmValid } = this.state;
    this.setState({ formValid: nameValid && emailValid && passwordValid && passwordConfirmValid });
  }

  submitForm(e) {
    e.preventDefault();
    const { name, email, password, passwordConfirm, formValid } = this.state;
    const { navigate } = this.props;

    if (name && email && password && passwordConfirm && formValid) {
      this.setState({
        loading: true
      });
      registerUser(
        {
          name,
          email,
          password,
          password_confirmation: passwordConfirm
        },
        reqTypes.REGISTER
      )
        .then((res) => {
          if (res.status) {
            navigate('/login', { replace: true });
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
    const {
      name,
      email,
      password,
      passwordConfirm,
      formErrors,
      nameDirty,
      emailDirty,
      passwordDirty,
      formValid,
      loading
    } = this.state;

    return (
      <form className="authForm" onSubmit={this.submitForm}>
        <h2>Register new account</h2>
        <div className={nameDirty && formErrors.name ? 'error input-block' : 'input-block'}>
          <p className="validation-error">{nameDirty && formErrors.name}</p>
          <input
            value={name}
            onChange={this.handleUserInput}
            onBlur={this.blurUserInput}
            name="name"
            type="text"
            placeholder="Username"
            autoComplete="on"
          />
        </div>
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
        <div className={formErrors.passwordConfirm ? 'error input-block' : 'input-block'}>
          <p className="validation-error">{formErrors.passwordConfirm}</p>
          <input
            className={formErrors.passwordConfirm ? 'error' : ''}
            value={passwordConfirm}
            onChange={this.handleUserInput}
            onBlur={this.blurUserInput}
            name="passwordConfirm"
            type="password"
            placeholder="Confirm password"
            autoComplete="on"
          />
        </div>
        <button
          className={`${formValid ? '' : 'disabled'} ${loading ? 'loading' : ''}`}
          type="submit"
        >
          {loading ? <div className="loader" /> : 'Register'}
        </button>
        <p className="changeAuthMethod">
          Already have an account?{' '}
          <Link to="/login">
            <button>Login</button>
          </Link>
        </p>
      </form>
    );
  }
}

export default withRouter(Register);
