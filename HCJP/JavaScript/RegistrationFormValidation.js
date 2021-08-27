const form = document.getElementById('registrationForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const preferredName = document.getElementById('preferredName');
const dateOfBirth = document.getElementById('dateOfBirth');
const gender = document.getElementById('gender');
const username = document.getElementById('username');
const emailAddress = document.getElementById('emailAddress');
const telephoneNumber = document.getElementById('telephoneNumber');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
//Set dateOfBirth initial value
  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;//0: January
  let dd = today.getDate();
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (dd < 10) {
    dd = '0' + dd;
  }
  today = yyyy + '-' + mm + '-' + dd;
  dateOfBirth.setAttribute("max", today);
  dateOfBirth.setAttribute("value", today);

form.addEventListener('submit', e => {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const firstNameValue = firstName.value.toLowerCase().trim();
  const lastNameValue = lastName.value.toLowerCase().trim();
  const preferredNameValue = preferredName.value.toLowerCase().trim();
  const dateOfBirthValue = dateOfBirth.value;
  const genderValue = gender.value;
  const usernameValue = username.value.trim();
  const emailAddressValue = emailAddress.value.trim();
  const telephoneNumberValue = telephoneNumber.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  //Check firstName
    if (firstNameValue === '') {
      setErrorFor(firstName, 'First name cannot be blank.');
    } else {
      if (!isNameType(firstNameValue)) {
        setErrorFor(firstName, 'Invalid first name. Must be 3-100 character-long alphabetic string.');
      } else {
        setSuccessFor(firstName);
      }
    }
  //Check lastName
    if (lastNameValue === '') {
      setErrorFor(lastName, 'Last name cannot be blank.');
    } else {
      if (!isNameType(lastNameValue)) {
        setErrorFor(lastName, 'Invalid last name. Must be 3-100 character-long alphabetic string.');
      } else {
        setSuccessFor(lastName);
      }
    }
  //Check preferredName
    if (preferredNameValue === '') {
      setSuccessFor(preferredName);
    } else {
      if (!isNameType(preferredNameValue)) {
        setErrorFor(preferredName, 'Invalid preferred name. Must be 3-100 character-long alphabetic string.');
      } else {
        setSuccessFor(preferredName);
      }
    }
  //Check dateOfBirth
    if (getAge(dateOfBirthValue) < 0 || getAge(dateOfBirthValue) > 120) {
      setErrorFor(dateOfBirth, 'Invalid date of birth. Must be 0-120 years old.');
    } else {
      setSuccessFor(dateOfBirth);
    }
  //Check gender
    if (genderValue === 'male' || genderValue === 'female') {
      setSuccessFor(gender);
    } else {
      setErrorFor(gender, 'Gender not selected. Optional.');
    }
  //Check userName
    if (usernameValue === '') {
      setErrorFor(username, 'Username cannot be blank.');
    } else {
      if (!isUsernameType(usernameValue)) {
        setErrorFor(username, 'Invalid username. Must be 8-100 character-long alphabetic string.');
      } else {
        setSuccessFor(username);
      }
    }
  //Check emailAddress
    if (emailAddressValue === '') {
      setErrorFor(emailAddress, 'Email address cannot be blank.');
    } else {
      if (!isEmailAddressType(emailAddressValue)) {
        setErrorFor(emailAddress, 'Invalid email address.');
      } else {
        setSuccessFor(emailAddress);
      }
    }
  //Check telephoneNumber
    if (telephoneNumberValue === '') {
      setErrorFor(telephoneNumber, 'Telephone number cannot be blank.')
    } else {
      if (!isTelephoneNumberType(telephoneNumberValue)) {
        setErrorFor(telephoneNumber, 'Invalid telephone number. Must be either 8 or 10 character-long numeric string.');
      } else {
        setSuccessFor(telephoneNumber);
      }
    }
  //Check password
    if (passwordValue === '') {
      setErrorFor(password, 'Password cannot be blank.');
    } else {
      if (!isPasswordType(passwordValue)) {
        setErrorFor(password, 'Invalid password. Must be 8-100 character-long alphanumeric string.');
      } else {
        setSuccessFor(password);
      }
    }
  //Check confirmPassword
    if (confirmPasswordValue === '') {
      setErrorFor(confirmPassword, 'Password cannot be blank.');
    } else {
      if (!isPasswordType(confirmPasswordValue)) {
        setErrorFor(confirmPassword, 'Invalid password. Must be 8-100 character-long alphanumeric string.');
      } else {
        if (confirmPasswordValue !== passwordValue) {
          setErrorFor(confirmPassword, 'Passwords do not match.');
        } else {
          setSuccessFor(confirmPassword);
        }
      }
    }
}

function setErrorFor(element, message) {
  const formControl = element.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(element) {
  const formControl = element.parentElement;
  formControl.className = 'form-control success';
}

function isNameType(nameValue) {
  let check = false;
  if (nameValue.length < 3 || nameValue.length > 100) {
    check = false;
  } else {
    check = /^[a-zA-Z]+$/.test(nameValue);
  }
  return check;
}

function getAge(ageValue) {
  const today = new Date();
  const dateOfBirth = new Date(ageValue);
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  let monthDifference = today.getMonth() - dateOfBirth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
    --age;
  }
  return age;
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

function isTelephoneNumberType(telephoneNumberValue) {
  return (/^[0-9]{8}$/.test(telephoneNumberValue) || /^[0-9]{10}$/.test(telephoneNumberValue));
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
