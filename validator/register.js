const validator = require("validator");
const isEmpty = require("./isEmpty");
const isAgeLess = age => {
  if (age <= 18) {
    return true;
  } else {
    return false;
  }
};
module.exports = function validateRegisterInput(data) {
  console.log("bodyyyy", data);
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email cannot be empty";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password cannot be empty";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password cannot be empty";
  }
  if (isAgeLess(data.age)) {
    errors.age = "Age not valid";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email not valid";
  }
  if (!validator.isLength(data.password, { min: 6, max: 100 })) {
    errors.password = "Password must be greater than 6";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.passwords = "Passwords must match";
  }
  console.log("errrrors", isEmpty(errors));

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
