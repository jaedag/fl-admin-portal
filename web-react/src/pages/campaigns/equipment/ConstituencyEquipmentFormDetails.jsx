import React, { useContext } from 'react'
import { Container, Row, Table } from 'react-bootstrap'
import HeadingSecondary from 'components/HeadingSecondary'
//import BaseComponent from 'components/base-component/BaseComponent'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { MemberContext } from 'contexts/MemberContext'
//import { useNavigate } from 'react-router'

const ConstituencyEquipmentFormDetails = () => {
  const { currentUser } = useContext(MemberContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const { theme } = useContext(MemberContext)
  //const navigate = useNavigate()

  return (
    <Container>
      <HeadingPrimary className="text-center">
        Equipment Campaign
      </HeadingPrimary>
      <HeadingSecondary className="text-center pb-4">{`${church?.name} ${churchType}`}</HeadingSecondary>
      <Row>
        <Table variant={theme} striped bordered>
          <tbody>
            <tr>
              <td>Date :</td>
              <td>26 Jan 2022</td>
            </tr>
            <tr>
              <td>Number of Offering Bags :</td>
              <td>30</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}

export default ConstituencyEquipmentFormDetails
