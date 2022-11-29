import React from 'react';
import { Link } from 'react-router-dom';

import loginUser from '../auth/requests';
import validateField from '../auth/validateField';
import { reqTypes } from '../consts/reqTypes';
import { AuthContext } from '../hoc/AuthProvider';
import { withRouter } from '../hoc/withRouter';

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
    const { email, password, formValid } = this.state;
    const { navigate } = this.props;
    const { signin } = this.context;

    if (email && password && formValid) {
      this.setState({
        loading: true
      });
      loginUser(
        {
          email,
          password
        },
        reqTypes.LOGIN
      )
        .then((res) => {
          if (res.status) {
            signin(res.data.access_token);
            navigate('/', { replace: true });
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
    const { email, password, formErrors, emailDirty, passwordDirty, formValid, loading } =
      this.state;

    return (
      <form className="authForm" onSubmit={this.submitForm}>
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
        <button
          className={`${formValid ? '' : 'disabled'} ${loading ? 'loading' : ''}`}
          type="submit"
        >
          {loading ? <div className="loader" /> : 'Login'}
        </button>
        <p className="changeAuthMethod">
          Need an account?{' '}
          <Link to="/register">
            <button>Register</button>
          </Link>
        </p>
      </form>
    );
  }
}

Login.contextType = AuthContext;

export default withRouter(Login);
