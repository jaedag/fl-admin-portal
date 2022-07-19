import PlaceholderCustom from 'components/Placeholder'
import React from 'react'

type HeadingPrimaryProps = {
  children: React.ReactNode
  className?: string
  loading?: boolean
}

export const HeadingPrimary = (props: HeadingPrimaryProps) => {
  const { children, loading, ...rest } = props

  return (
    <PlaceholderCustom as="h3" loading={loading}>
      <h3 {...rest}>{children}</h3>
    </PlaceholderCustom>
  )
}
