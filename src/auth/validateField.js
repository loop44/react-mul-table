const validateField = (fieldName, value, thisObj) => {
  let { emailValid, passwordValid } = thisObj.state;
  const { formErrors } = thisObj.state;

  switch (fieldName) {
    case 'email':
      if (value.length === 0) {
        formErrors.email = 'Email can`t be empty';
        emailValid = false;
        break;
      }
      if (
        !String(value)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        formErrors.email = 'Email is invalid';
        emailValid = false;
        break;
      }

      formErrors.email = '';
      emailValid = true;
      break;
    case 'password':
      if (value.length === 0) {
        formErrors.password = 'Password can`t be empty';
        passwordValid = false;
        break;
      }
      if (value.length < 6) {
        formErrors.password = 'Password is too short';
        passwordValid = false;
        break;
      }
      if (value.length > 20) {
        formErrors.password = 'Password is too long';
        passwordValid = false;
        break;
      }

      formErrors.password = '';
      passwordValid = true;
      break;
    default:
      break;
  }

  thisObj.setState({ formErrors, emailValid, passwordValid }, thisObj.validateForm);
};

export default validateField;
