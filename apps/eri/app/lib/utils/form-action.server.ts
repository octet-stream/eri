import {redirect, json} from "@remix-run/node"
import {createFormAction} from "remix-forms"

export const formAction = createFormAction({redirect, json})
