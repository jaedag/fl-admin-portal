import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import MultiplicationCampaignServiceForm from 'pages/campaigns/multiplication/MulltiplicationCampaignServiceForm'
import { RECORD_MULTIPLICATION_EVENT } from '../MultiplicationQueries'
import { useMutation } from '@apollo/client'

const TeamMultiplicationCampaignServiceForm = () => {
  const { currentUser } = useContext(MemberContext)

  const church = currentUser.currentChurch
  const { teamId } = useContext(ChurchContext)
  const [RecordMultiplicationEvent] = useMutation(RECORD_MULTIPLICATION_EVENT)

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <HeadingPrimary>Multiplication Campaign</HeadingPrimary>
        </div>

        <MultiplicationCampaignServiceForm
          RecordServiceMutation={RecordMultiplicationEvent}
          church={church}
          churchId={teamId}
          churchType="Team"
        />
      </Container>
    </div>
  )
}

export default TeamMultiplicationCampaignServiceForm
