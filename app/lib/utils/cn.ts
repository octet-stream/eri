import {type CxOptions, cx} from "class-variance-authority"
import {twMerge} from "tailwind-merge"

/**
 * CLSX with Tailwind Merge and CVA flavor
 */
export const cn = (...classes: CxOptions) => twMerge(cx(...classes))
