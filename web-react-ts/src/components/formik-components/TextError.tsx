import { JSXChildren } from 'global-types'
import React from 'react'

const TextError = (props: JSXChildren) => {
  return <small className="error">{props.children}</small>
}

export default TextError
