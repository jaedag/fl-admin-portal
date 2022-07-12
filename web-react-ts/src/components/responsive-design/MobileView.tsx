import { JSXChildren } from 'global-types'
import React from 'react'

const MobileView = (props: JSXChildren) => {
  return <div className="d-lg-none">{props.children}</div>
}

export default MobileView
