import csurf from "csurf"

// Place it only after either cookie-parser middleware or express-session
const middleware = csurf({cookie: true})

export default middleware
