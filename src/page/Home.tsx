// @ts-nocheck
import React, { useEffect, useState } from "react";
import { sectors } from "../assets/sectors";
import { InputValue, FormErrors } from "../utils/types";
import Validation from "../utils/validation";
import { saveDataToLocalStorage } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Option } from "../components/SelectHelperComponents";

const Home = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<InputValue>({
    name: "",
    sector: "",
    agreeTerms: false,
  });
  const [formErrors, setSetFormErrors] = useState<FormErrors>();
  const [isSumitForm, setIsSumitForm] = useState(false);

  const handleSectorInput = (value: any) => {
    setInputValues({
      ...inputValues,
      sector: value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : e.target.value;
    setInputValues({
      ...inputValues,
      [name]: inputValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSumitForm(true);
    const dataErrors = Validation(inputValues);
    setSetFormErrors(dataErrors);
    if (dataErrors?.name || dataErrors?.sector || dataErrors?.agreeTerms) {
      return;
    }

    saveDataToLocalStorage("formData", inputValues);
    console.log("Form data submitted:", inputValues);
    navigate(`/${inputValues.name}`);
  };

  useEffect(() => {
    if (isSumitForm) {
      const dataErrors = Validation(inputValues);
      setSetFormErrors(dataErrors);
    }
  }, [isSumitForm, inputValues, setInputValues]);

  const customStyles = {
    option: (base, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...base,
        backgroundColor: isFocused ? "red" : "blue",
      };
    },
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-xl font-light leading-9 tracking-tight text-gray-900">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                value={inputValues.name}
                onChange={handleInputChange}
                className=" w-full rounded border-0 p-2 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-900  bg-transparent focus:outline-none"
                placeholder="Enter your Name"
              />
              {formErrors && (
                <span className="text-red-600 mt-0.5 text-[0.625rem] sm:text-xs">
                  {formErrors?.name}
                </span>
              )}
            </div>

            {/* Select Option */}
            <Select
              components={{
                Option,
              }}
              isClearable
              isSearchable
              formatGroupLabel={(value) => {
                return value.name;
              }}
              formatOptionLabel={(value) => {
                return value.name;
              }}
              getOptionValue={(value) => {
                return value.name;
              }}
              onChange={handleSectorInput}
              options={sectors}
              placeholder="Please select a sector"
              className="select-wrapper"
              classNamePrefix="select"
            />
            {formErrors && (
              <span className="text-red-600 mt-0.5 text-[0.625rem] sm:text-xs">
                {formErrors?.sector}
              </span>
            )}

            <div className="flex items-center">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={inputValues.agreeTerms}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 .placeholder-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-900"
              >
                Agree to Terms.
              </label>
            </div>

            {formErrors && (
              <span className="text-red-600  text-[0.625rem] sm:text-xs ">
                {formErrors?.agreeTerms}
              </span>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
