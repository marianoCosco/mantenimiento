import { nanoid } from "nanoid";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function createId() {
  return nanoid();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
