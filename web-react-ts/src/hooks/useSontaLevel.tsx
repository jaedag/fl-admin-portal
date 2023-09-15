import {
  ApolloError,
  ApolloQueryResult,
  LazyQueryExecFunction,
  OperationVariables,
} from '@apollo/client'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchLevel } from 'global-types'
import { getSubChurchLevel } from 'global-utils'
import { useContext, useEffect, useState } from 'react'

type useSontaLevelProps = {
  constituencyFunction?: LazyQueryExecFunction<any, OperationVariables>
  constituencyRefetch: () => Promise<ApolloQueryResult<any>>
  councilFunction: LazyQueryExecFunction<any, OperationVariables>
  councilRefetch: () => Promise<ApolloQueryResult<any>>
  streamFunction: LazyQueryExecFunction<any, OperationVariables>
  streamRefetch: () => Promise<ApolloQueryResult<any>>
  campusFunction: LazyQueryExecFunction<any, OperationVariables>
  campusRefetch: () => Promise<ApolloQueryResult<any>>

  hubFunction?: LazyQueryExecFunction<any, OperationVariables>
  hubRefetch: () => Promise<ApolloQueryResult<any>>
  ministryFunction?: LazyQueryExecFunction<any, OperationVariables>
  ministryRefetch: () => Promise<ApolloQueryResult<any>>
  creativeArtsFunction?: LazyQueryExecFunction<any, OperationVariables>
  creativeArtsRefetch: () => Promise<ApolloQueryResult<any>>
}

const useSontaLevel = (props: useSontaLevelProps) => {
  const { currentUser } = useContext(MemberContext)

  const currentChurch = currentUser?.currentChurch
  const churchLevel: ChurchLevel = currentUser?.currentChurch?.__typename
  const subChurchLevel: ChurchLevel = getSubChurchLevel(
    currentChurch?.__typename
  )

  const [church, setChurch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<undefined | ApolloError>()

  const { arrivalDate } = useContext(ChurchContext)

  const chooseRefetch = () => {
    switch (churchLevel) {
      case 'CreativeArts':
        return props.creativeArtsRefetch
      case 'Ministry':
        return props.ministryRefetch
      case 'Hub':
        return props.hubRefetch
      case 'Constituency':
        return props.constituencyRefetch
      case 'Council':
        return props.councilRefetch
      case 'Stream':
        return props.streamRefetch
      case 'Campus':
        return props.campusRefetch
      default:
        return props.councilRefetch
    }
  }
  useEffect(() => {
    const whichQuery = async () => {
      switch (churchLevel) {
        case 'CreativeArts':
          {
            if (!props.creativeArtsFunction) break
            const res = await props.creativeArtsFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res?.data?.creativeArts[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break
        case 'Ministry':
          {
            if (!props.ministryFunction) break
            const res = await props.ministryFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res?.data?.ministries[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break
        case 'Hub':
          {
            if (!props.hubFunction) break

            const res = await props.hubFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res?.data?.hubs[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break
        case 'Constituency':
          {
            if (!props.constituencyFunction) break
            const res = await props.constituencyFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res.data?.constituencies[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break
        case 'Council':
          {
            const res = await props.councilFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res?.data?.councils[0])
            setLoading(res.loading)
            setError(res.error)
          }

          break
        case 'Stream':
          {
            const res = await props.streamFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })
            setChurch(res?.data?.streams[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break

        case 'Campus':
          {
            const res = await props.campusFunction({
              variables: {
                id: currentChurch?.id,
                arrivalDate: arrivalDate,
              },
            })

            setChurch(res?.data?.campuses[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break
        default:
          break
      }
    }

    whichQuery()
  }, [setChurch])

  return { church, subChurchLevel, loading, error, refetch: chooseRefetch() }
}

export default useSontaLevel
