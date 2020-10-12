module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  plugins: [
    "react"
  ],
  extends: [
    "airbnb",
    "@octetstream"
  ],
  settings: {
    "import/resolver": {
      "babel-module": {
        cwd: __dirname,
        root: ["."],
      }
    }
  },
  rules: {
    "max-len": ["error", {
      ignoreComments: true,
      code: 80
    }],
    indent: ["error", 2, {
      SwitchCase: 1
    }],
    // TODO: Don't forget to move this rule to my personal shared config.
    "prefer-const": ["error", {
      destructuring: "all"
    }],
    "no-constant-condition": ["error", {
      checkLoops: false
    }],

    "operator-linebreak": ["error", "before"],
    "func-names": ["error", "always", {
      generators: "never"
    }],

    "react/react-in-jsx-scope": 0,
    "react/static-property-placement": ["error", "static public field"],
    "react/state-in-constructor": 0,
    "react/button-has-type": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-fragments": ["error", "element"],
    "react/prop-types": ["error", {skipUndeclared: true}],

    // ! Disable this rule because Next.js <Link> component can't deal with it
    // ! See: https://github.com/vercel/next.js/issues/5533
    "jsx-a11y/anchor-is-valid": 0
  }
}
