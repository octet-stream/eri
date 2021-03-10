import Node from "./Node"

import Dates from "./Dates"

export default interface User extends Node {
  login: string
  name: {
    first: string,
    last: string
  }
  dates: Dates
}
