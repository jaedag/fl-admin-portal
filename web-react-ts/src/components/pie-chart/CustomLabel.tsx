import React from 'react'

type CustomLabelProps = {
  label: string
  total: number
}

const CustomLabel = ({ label, total }: CustomLabelProps) => {
  return (
    <g>
      <text
        x="50%"
        y="32%"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="17"
        fill="#868686"
      >
        {label}
      </text>
      <text
        x="50%"
        y="27%"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="#ffffff"
        fontSize="36"
        fontWeight="500"
        height={39}
      >
        {total}
      </text>
    </g>
  )
}

export default CustomLabel
