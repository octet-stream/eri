import t from "prop-types"

const {isArray} = Array

const error = Matcher => Target => {
  function WithError({errors, ...props}) {
    if (!isArray(error)) {
      errors = [errors]
    }

    return (
      <Matcher errors={errors}>
        <Target {...props} />
      </Matcher>
    )
  }

  WithError.propTypes = {
    errors: t.oneOfType([
      t.arrayOf(t.instanceOf(Error)),
      t.instanceOf(Error)
    ]).isRequired
  }

  return WithError
}

export default error
