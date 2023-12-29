import { makeVar } from "@apollo/client";

export const darkModeVar = makeVar(false);

export const lightTheme = {
  fontColor: "black",
  bgColor: "white",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "black",
};
