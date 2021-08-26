const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const emailAddress = document.getElementById('emailAddress');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

form.addEventListener('submit', e => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const usernameValue = username.value.trim();
  const emailAddressValue = emailAddress.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank.');
  } else if (!isUsernameType(usernameValue)) {
    setErrorFor(username, 'Invalid username. Must be 8-100 character-long alphabetic string.')
  } else {
    setSuccessFor(username);
  }

  if (emailAddressValue === '') {
    setErrorFor(emailAddress, 'Email address cannot be blank.');
  } else if (!isEmailAddressType(emailAddressValue)) {
    setErrorFor(emailAddress, 'Invalid email address.');
  } else {
    setSuccessFor(emailAddress);
  }

  if (passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank.');
  } else if (!isPasswordType(passwordValue)) {
    setErrorFor(password, 'Invalid password. Must be 8-100 character-long alphanumeric string.')
  } else {
    setSuccessFor(password);
  }

  if (confirmPasswordValue === '') {
    setErrorFor(confirmPassword, 'Password cannot be blank.');
  } else if (!isPasswordType(confirmPasswordValue)) {
    setErrorFor(confirmPassword, 'Password is not valid.')
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, 'Passwords do not match.');
  } else {
    setSuccessFor(confirmPassword);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isUsernameType(usernameValue) {
  let check = false;
  if (usernameValue.length < 8 || usernameValue.length > 100) {
    check = false;
  } else {
    check = /^[a-zA-Z]+$/.test(usernameValue);
  }
  return check;
}

function isEmailAddressType(emailAddressValue) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddressValue);
}

function isPasswordType(passwordValue) {
  let check = false;
  if (passwordValue.length < 8 || passwordValue.length > 100) {
    check = false;
  } else {
    check = /^[a-zA-Z0-9]+$/.test(passwordValue);
  }
  return check;
}