import { FormErrors, InputValue } from "./types";

const Validation = (inputValues: InputValue) => {
  const errors: FormErrors = {
    name: "",
    sector: "",
    agreeTerms: "",
  };

  if (!inputValues.name) {
    errors.name = "Please enter a Name";
  }
  if (!inputValues.sector) {
    errors.sector = "Please select a sector";
  }
  if (inputValues.agreeTerms === false) {
    errors.agreeTerms = "Please check box";
  }
  return errors;
};

export default Validation;
