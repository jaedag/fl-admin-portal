import React from 'react'

const ErrorText = ({ children }: { children: string }) => {
  return <div className="text-center fw-bold text-danger">{children}</div>
}

export default ErrorText
