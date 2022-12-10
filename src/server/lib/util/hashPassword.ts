import {hash} from "bcrypt"

export const hashPassword = (password: string) => hash(password, 15)
