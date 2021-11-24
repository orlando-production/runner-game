export type ValidationProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    login: string,
    password?: string
};

export type ValidationData = {
    isValid: boolean,
    warning?: string
};

const regexp = {
  checkPhoneNumber: /^(\+7|7|8)[0-9]{10}$/,
  checkEmail: /^[\w\d.-]*@[\w\d.-]*$/
};

const resources = {
  allFieldsRequired: 'All fields are required. ',
  checkPhoneNumber: 'Phone should starts with +7 or 8. Length should be from 10 to 15 digits. ',
  checkEmail: 'Email should contains only latin letters, numbers and symbols. '
};

const isErrorInPhoneNumber = (value: string): boolean => {
  const { checkPhoneNumber } = regexp;
  return !value.match(checkPhoneNumber) || (value.length < 10 || value.length > 15);
};

const isErrorInEmail = (value: string): boolean => {
  const { checkEmail } = regexp;
  return !value.match(checkEmail);
};

export const isAllFieldsValid = ({
  firstName, lastName, email, phone, login, password
}: ValidationProps): ValidationData => {
  let isError = false;
  let errorText = '';

  if ((firstName === '') || (lastName === '') || (email === '') || (phone === '') || (login === '') || (password === '')) {
    isError = true;
    errorText += resources.allFieldsRequired;
  }

  if ((phone !== '') && isErrorInPhoneNumber(phone)) {
    isError = true;
    errorText += resources.checkPhoneNumber;
  }

  if ((email !== '') && isErrorInEmail(email)) {
    isError = true;
    errorText += resources.checkEmail;
  }

  return { isValid: !isError, warning: errorText };
};
