import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Make random ID for exercises and workouts
export function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 24) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const useLocalStorage = (key) => {
  const setItem = (value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error)
    }
  };

  const getItem = () => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : false;
    } catch (error) {
      console.log(error)
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error)
    }
  }

  return { setItem, getItem };
};
