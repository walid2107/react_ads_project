const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.fullname, { min: 2, max: 30 })) {
    errors.fullname = "fullname must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.phone, { min: 8, max: 8 })) {
    errors.phone = "phone must contain 8 numbers";
  }

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = "fullname field is required";
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password  must be at least 6 charcters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
