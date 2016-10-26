"use strict"

isEmail = (string = "") ->
  ///
    ^[-a-z0-9~!$%^&*_=+}{\'?]+
    (\.[-a-z0-9~!$%^&*_=+}{\'?]+)*
    @([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*
    \.(aero|arpa|biz|com|coop|edu|gov|info|
    int|mil|museum|name|net|org|pro|travel|
    mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}
    \.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$
  ///i.test string

isValidLogin = (string = "") -> /^[a-z0-9_\.]+$/i.test string

isValidPassword = (string = "") -> /^.{8,}$/i.test string

module.exports = {
  isEmail
  isValidLogin
  isValidPassword
}
