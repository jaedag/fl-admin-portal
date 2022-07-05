import { ApolloError } from '@apollo/client'
import React from 'react'
import ErrorScreen from './ErrorScreen'
import LoadingScreen from './LoadingScreen'

type ApolloWrapperPropsType = {
  placeholder?: boolean
  apolloData: {
    data: any
    loading: boolean
    error?: ApolloError | undefined
  }
  children: JSX.Element
}

const ApolloWrapper = (props: ApolloWrapperPropsType) => {
  const { apolloData, placeholder } = props
  const { data, loading, error } = apolloData

  if (data || placeholder) {
    return <>{props.children}</>
  } else if (loading) {
    return <LoadingScreen />
  } else if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return <ErrorScreen />
  }

  return <LoadingScreen />
}

export default ApolloWrapper
