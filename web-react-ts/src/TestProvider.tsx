import { MemberContext } from 'contexts/MemberContext'
import { JSXChildren } from 'global-types'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import { Route, Routes } from 'react-router'

const TestProvider = (props: JSXChildren) => {
  return (
    <MemberContext.Provider value={{ id: 'user-id' }}>
      <BrowserRouter>{props.children}</BrowserRouter>
    </MemberContext.Provider>
  )
}

export default TestProvider
