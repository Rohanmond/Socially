export const validateMobileNo = (input) => {
  return /^[0-9]+$/.test(input);
};
export const validatePinCode = (input) => {
  return /^[0-9]+$/.test(input) && input.length === 6;
};
export const validateOnlyString = (input) => {
  return /^[a-z A-Z]+$/.test(input) || input === '';
};
export const validateEmail = (input) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    input.toLowerCase()
  );
};
export const validatePassword = (input) => {
  return /^(?=.{8,20}$)\D*\d/.test(input);
};
