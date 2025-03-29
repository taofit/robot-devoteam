import e from "express";

export const isValidSize = (size: string): boolean => {
  const isValid = size.match(/^[1-9][0-9]*\s[1-9][0-9]*$/);

  return !!isValid;
}

export const isValidPosition = (position: string): boolean => {
  const isValid = position.match(/^[0-9]+\s[0-9]+\s(N|E|S|W)$/);

  return !!isValid;
}

export const isValidCommand = (command: string): boolean => {
  const isValid = command.match(/^[LRF]+$/);

  return !!isValid;
}