import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAvatarDoubleCharacters(name) {
  const chars = name.split(" ");
  const firstInitial = chars[0][0];
  const lastInitial = chars[1][0];
  return firstInitial + lastInitial;
}

export function getAvatarSingleChar(name) {
  return name.split(" ")[0][0];
}
