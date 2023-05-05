// function validation() {
//   if (document.formfill.Username.value === "") {
//     document.getElementById("result").innerHTML = "Enter username";
//     return false;
//   }
// }

// reference for tutorial reminder https://www.javascripttutorial.net/javascript-dom/javascript-form-validation/

const fullnameEl = document.querySelector("#fullname");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const form = document.querySelector("#formfill");

// to prevent the form from submitting
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
// });

// checkEmail uses the isRequired and isEmailValid functions for checking
const isRequired = function (value) {
  if (value === "") {
    return false;
  } else {
    return true;
  }
};

const isBetween = function (length, min, max) {
  if (length < min || length > max) {
    return false;
  } else {
    return true;
  }
};

const isEmailValid = function (email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = function (password) {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};

const showError = function (input, message) {
  //it gets the form-field element from html code
  const formField = input.parentElement;
  //adds the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = function (input) {
  // get the form-field element
  const formField = input.parentElement;
  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

// validatinfg the full name

const checkFullName = function () {
  let valid = false;
  const min = 5,
    max = 25;

  const fullName = fullnameEl.value.trim();
  //trim is to remove white spaces in the text content

  if (!isRequired(fullName)) {
    showError(fullnameEl, "Username cannot be blank.");
  } else if (!isBetween(fullName.length, min, max)) {
    showError(fullnameEl, `Username must between ${min} and ${max} characters`);
  } else {
    showSuccess(fullnameEl);
    valid = true;
  }
  return valid;
};

// Validating the email field
const checkEmail = function () {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};

// validating the password field
const checkPassword = function () {
  let valid = false;

  const password = passwordEl.value.trim();

  if (!isRequired(password)) {
    showError(passwordEl, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordEl,
      "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
    );
  } else {
    showSuccess(passwordEl);
    valid = true;
  }

  return valid;
};

// what happens when submit button is clicked
form.addEventListener("submit", function (event) {
  // prevent the form from submitting
  event.preventDefault();

  // validate forms
  let isFullNameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid =
    isFullNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // submit to the server if the form is valid
  if (isFormValid) {
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "username":
        checkUsername();
        break;
      case "email":
        checkEmail();
        break;
      case "password":
        checkPassword();
        break;
      case "confirm-password":
        checkConfirmPassword();
        break;
    }
  })
);
