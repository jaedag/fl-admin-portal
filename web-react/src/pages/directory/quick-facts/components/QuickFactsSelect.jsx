import React from 'react'
import '../QuickFacts.css'

const QuickFactsSelect = () => {
  const options = ['This Month']
  return (
    <select className="dropdown" name="dropdown" id="dropdown">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default QuickFactsSelect
