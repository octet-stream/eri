import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

/**
 * @deprecated use `@udecode/cn` instead
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
