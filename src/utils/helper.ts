import { InputValue } from "./types";

export const saveDataToLocalStorage = (key: string, data: InputValue) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to retrieve data from localStorage
export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
