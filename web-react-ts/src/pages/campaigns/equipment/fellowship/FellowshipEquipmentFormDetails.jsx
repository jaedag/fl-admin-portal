import React, { useContext } from 'react'
import { Container, Row, Table, Button } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useQuery } from '@apollo/client'
import { FELLOWSHIP_LATEST_EQUIPMENT_RECORD } from '../../CampaignQueries'
import { useNavigate } from 'react-router'

const FellowshipEquipmentFormDetails = () => {
  const { currentUser } = useContext(MemberContext)
  const { fellowshipId } = useContext(ChurchContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()

  const { data, loading, error } = useQuery(
    FELLOWSHIP_LATEST_EQUIPMENT_RECORD,
    {
      variables: {
        fellowshipId: fellowshipId,
      },
    }
  )

  const fellowship = data?.fellowships[0]

  const equipmentDate = fellowship?.latestEquipmenRecord?.equipmentDate?.date
  const offeringBags = fellowship?.latestEquipmenRecord?.offeringBags

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary className="text-center">
          Equipment Campaign
        </HeadingPrimary>
        <HeadingSecondary className="text-center pb-4">{`${church?.name} ${churchType}`}</HeadingSecondary>
        <Row>
          <Table variant={theme} striped bordered>
            <tbody>
              <tr>
                <td>Date </td>
                <td>{equipmentDate?.slice(0, 10)}</td>
              </tr>
              <tr>
                <td>Number of Offering Bags </td>
                <td>{offeringBags}</td>
              </tr>
            </tbody>
          </Table>
        </Row>

        <div className="d-flex justify-content-center pt-5">
          <Button
            size="lg"
            type="submit"
            className={`btn-main ${theme} px-5`}
            onClick={() => navigate(`/campaigns/fellowship/equipment/trends`)}
          >
            Continue
          </Button>
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default FellowshipEquipmentFormDetails
