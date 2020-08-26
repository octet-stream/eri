function addSessionData({session}, data) {
  for (const [key, value] of Object.entries(data)) {
    session[key] = value
  }
}

export default addSessionData
