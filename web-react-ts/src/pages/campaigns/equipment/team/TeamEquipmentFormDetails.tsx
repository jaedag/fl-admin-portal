import React, { useContext } from 'react'
import { Container, Row, Table, Button } from 'react-bootstrap'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useQuery } from '@apollo/client'
import { TEAM_LATEST_EQUIPMENT_RECORD } from '../../CampaignQueries'
import { useNavigate } from 'react-router'
import HeadingSecondary from 'components/HeadingSecondary'

const TeamEquipmentFormDetails = () => {
  const { currentUser } = useContext(MemberContext)
  const { teamId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(TEAM_LATEST_EQUIPMENT_RECORD, {
    variables: {
      teamId: teamId,
    },
  })

  const team = data?.teams[0]

  const pulpits = team?.equipmentRecord?.pulpits

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Equipment Campaign</HeadingSecondary>
        </div>

        <Row>
          <Table variant={theme} striped bordered>
            <tbody>
              <tr>
                <td>Date :</td>
                <td>{new Date().toISOString().slice(0, 10)}</td>
              </tr>
              <tr>
                <td>Pulpits :</td>
                <td>{pulpits}</td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <div className="d-flex justify-content-center pt-5">
          <Button
            size="lg"
            type="submit"
            className={`btn-main ${theme}`}
            onClick={() => navigate(`/campaigns/team/equipment/trends`)}
          >
            Continue
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default TeamEquipmentFormDetails
