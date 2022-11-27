import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import HeadingSecondary from 'components/HeadingSecondary'
import MultiplicationCampaignServiceForm from '../MulltiplicationCampaignServiceForm'
import { useMutation } from '@apollo/client'
import { RECORD_MULTIPLICATION_EVENT } from '../MultiplicationQueries'

const GatheringServiceMultiplicationCampaignServiceForm = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const { gatheringServiceId } = useContext(ChurchContext)
  const [RecordMultiplicationEvent] = useMutation(RECORD_MULTIPLICATION_EVENT)

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingSecondary>Multiplication Campaign</HeadingSecondary>
        </div>
        <MultiplicationCampaignServiceForm
          RecordServiceMutation={RecordMultiplicationEvent}
          church={church}
          churchId={gatheringServiceId}
          churchType="GatheringService"
        />
      </Container>
    </div>
  )
}

export default GatheringServiceMultiplicationCampaignServiceForm
