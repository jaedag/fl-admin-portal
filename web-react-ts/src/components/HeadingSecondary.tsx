import React from 'react'
import PlaceholderCustom from './Placeholder'

type HeadingSecondaryProps = {
  children: React.ReactNode
  loading?: boolean
}

const HeadingSecondary = (props: HeadingSecondaryProps) => {
  const { children, loading, ...rest } = props
  return (
    <PlaceholderCustom as="h6" loading={loading}>
      <h6 className="text-secondary" {...rest}>
        {children}
      </h6>
    </PlaceholderCustom>
  )
}

export default HeadingSecondary
