import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { BACENTA_BY_FELLOWSHIP } from '../../CampaignQueries'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { ChurchContext } from 'contexts/ChurchContext'
import FellowshipTrendsButton from '../../components/buttons/FellowshipTrendsButton'
import { EquipmentChurch } from 'global-types'

const BacentaByFellowship = () => {
  const { bacentaId } = useContext(ChurchContext)

  const { data, loading, error } = useQuery(BACENTA_BY_FELLOWSHIP, {
    variables: { bacentaId: bacentaId },
  })
  const fellowships = data?.bacentas[0]?.fellowships

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 text-secondary">Equipment Campaign</h1>
            <h6>{`${data?.bacentas[0].name} ${data?.bacentas[0].__typename}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            {fellowships?.map((fellowship: EquipmentChurch, index: number) => (
              <FellowshipTrendsButton key={index} church={fellowship} />
            ))}
          </div>
        </Container>
      </div>
    </ApolloWrapper>
  )
}

export default BacentaByFellowship
