const validateField = (fieldName, value, thisObj) => {
  let { nameValid, emailValid, passwordValid, passwordConfirmValid } = { ...thisObj.state };
  const { formErrors } = thisObj.state;

  switch (fieldName) {
    case 'name':
      if (value.length === 0) {
        formErrors.name = 'Name can`t be empty';
        nameValid = false;
        break;
      }
      if (value.length < 2) {
        formErrors.name = 'Name is too short';
        nameValid = false;
        break;
      }
      if (value.length > 20) {
        formErrors.name = 'Name is too long';
        nameValid = false;
        break;
      }

      formErrors.name = '';
      nameValid = true;
      break;
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
      if (value !== thisObj.state.passwordConfirm && thisObj.state.passwordConfirm?.length > 0) {
        formErrors.passwordConfirm = 'Passwords not equal';
        passwordConfirmValid = false;
        break;
      } else if (
        value === thisObj.state.passwordConfirm &&
        thisObj.state.passwordConfirm.length > 0
      ) {
        formErrors.passwordConfirm = '';
        passwordConfirmValid = true;
      }

      formErrors.password = '';
      passwordValid = true;
      break;
    case 'passwordConfirm':
      if (value !== thisObj.state.password || value.length === 0) {
        formErrors.passwordConfirm = 'Passwords not equal';
        passwordConfirmValid = false;
        break;
      }

      formErrors.passwordConfirm = '';
      passwordConfirmValid = true;
      break;
    default:
      break;
  }

  thisObj.setState(
    { formErrors, nameValid, emailValid, passwordValid, passwordConfirmValid },
    thisObj.validateForm
  );
};

export default validateField;
