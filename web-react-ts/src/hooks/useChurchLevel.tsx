import {
  ApolloError,
  ApolloQueryResult,
  LazyQueryExecFunction,
  OperationVariables,
} from '@apollo/client'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchLevel } from 'global-types'
import { getSubChurchLevel } from 'global-utils'
import { useContext, useEffect, useState } from 'react'

type useChurchLevelProps = {
  constituencyFunction?: LazyQueryExecFunction<any, OperationVariables>
  constituencyRefetch?: () => Promise<ApolloQueryResult<any>>
  councilFunction: LazyQueryExecFunction<any, OperationVariables>
  councilRefetch: () => Promise<ApolloQueryResult<any>>
  streamFunction: LazyQueryExecFunction<any, OperationVariables>
  streamRefetch: () => Promise<ApolloQueryResult<any>>
  gatheringServiceFunction: LazyQueryExecFunction<any, OperationVariables>
  gatheringServiceRefetch: () => Promise<ApolloQueryResult<any>>
}

const useChurchLevel = (props: useChurchLevelProps) => {
  const { currentUser } = useContext(MemberContext)

  const currentChurch = currentUser?.currentChurch
  const churchLevel: ChurchLevel = currentUser?.currentChurch?.__typename
  const subChurchLevel: ChurchLevel = getSubChurchLevel(
    currentChurch?.__typename
  )

  const [church, setChurch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<undefined | ApolloError>()

  const chooseRefetch = () => {
    switch (churchLevel) {
      case 'Constituency':
        return props.constituencyRefetch || props.councilRefetch
      case 'Council':
        return props.councilRefetch
      case 'Stream':
        return props.streamRefetch
      case 'GatheringService':
        return props.gatheringServiceRefetch
      default:
        return props.councilRefetch
    }
  }
  useEffect(() => {
    const whichQuery = async () => {
      switch (churchLevel) {
        case 'Constituency':
          {
            if (!props.constituencyFunction) break
            const res = await props.constituencyFunction({
              variables: {
                id: currentChurch?.id,
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
              },
            })
            setChurch(res?.data?.streams[0])
            setLoading(res.loading)
            setError(res.error)
          }
          break

        case 'GatheringService':
          {
            const res = await props.gatheringServiceFunction({
              variables: {
                id: currentChurch?.id,
              },
            })

            setChurch(res?.data?.gatheringServices[0])
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

export default useChurchLevel
