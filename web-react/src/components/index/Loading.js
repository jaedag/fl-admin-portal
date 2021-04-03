import React from 'react'
import Spinner from '../Spinner'

function Loading() {
  return (
    <div className="row my-auto">
      <div className="col">
        <Spinner />
      </div>
    </div>
  )
}
export default Loading
