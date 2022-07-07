import { useContext } from 'react'
import { ChurchContext } from '../../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_FELLOWSHIP } from '../../directory/display/ReadQueries'
import CancelledServiceForm from './CancelledServiceForm'
import ApolloWrapper from 'components/base-component/ApolloWrapper'

const FellowshipServiceCancelled = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(DISPLAY_FELLOWSHIP, {
    variables: { id: fellowshipId },
  })

  return (
    <ApolloWrapper loading={loading} error={error} data={data} placeholder>
      <CancelledServiceForm
        church={data?.fellowships[0]}
        churchId={fellowshipId}
        churchType="fellowship"
      />
    </ApolloWrapper>
  )
}

export default FellowshipServiceCancelled
