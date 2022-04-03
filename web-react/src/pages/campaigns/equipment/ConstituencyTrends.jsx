import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import TrendsButton from '../components/buttons/TrendsButton'
import { MemberContext } from 'contexts/MemberContext'
import { useQuery } from '@apollo/client'
import { CONSTITUENCY_TRENDS } from '../CampaignQueries'
import BaseComponent from 'components/base-component/BaseComponent'
import { ChurchContext } from 'contexts/ChurchContext'

const ConstituencyEquipmentTrends = () => {
  const { currentUser } = useContext(MemberContext)
  const { constituencyId } = useContext(ChurchContext)

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { data, loading, error } = useQuery(CONSTITUENCY_TRENDS, {
    variables: { constituencyId: constituencyId },
  })
  // const offeringBags = data?.constituencies[0]?.offeringBags
  // const pulpits = data?.constituencies[0]?.pulpits

  //console.log(data?.constituencies[0])

  return (
    <BaseComponent data={data} loading={loading} error={error}>
      <div className="d-flex align-items-center justify-content-center ">
        <Container>
          <div className="text-center">
            <h1 className="mb-1 ">EQ CAMPAIGN</h1>
            <h6>{`${church?.name} ${churchType}`}</h6>
          </div>
          <div className="d-grid gap-2 mt-4 text-center px-2">
            <TrendsButton data={data} />
          </div>
        </Container>
      </div>
    </BaseComponent>
  )
}

export default ConstituencyEquipmentTrends
