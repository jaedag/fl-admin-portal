import { JSXChildren } from 'global-types'
import React from 'react'

const TabletDesktopView = (props: JSXChildren) => {
  return <div className="d-none d-lg-block">{props.children}</div>
}

export default TabletDesktopView
