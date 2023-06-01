import React from 'react'
import { useQuery } from '@apollo/client'
import Timeline from 'components/Timeline/Timeline'
import MemberRoleList from 'components/MemberRoleList'
import { throwToSentry, USER_PLACEHOLDER } from 'global-utils'
import { getMemberDob } from 'jd-date-utils'
import {
  DISPLAY_MEMBER_ADMIN,
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
  DISPLAY_MEMBER_LEADERSHIP,
} from 'pages/directory/display/ReadQueries'
import { Col, Container, Row } from 'react-bootstrap'
import PlaceholderCustom from 'components/Placeholder'
import DetailsCard from 'components/card/DetailsCard'
import EditButton from 'components/buttons/EditButton'
import RoleView from 'auth/RoleView'
import ViewAll from 'components/buttons/ViewAll'
import CloudinaryImage from 'components/CloudinaryImage'
import { Member } from 'global-types'
import { permitAdmin, permitLeader, permitSheepSeeker } from 'permission-utils'

const MemberDisplay = ({ memberId }: { memberId: string }) => {
  const {
    data: bioData,
    loading,
    error,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: memberId },
  })
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: memberId },
  })
  const { data: leaderData } = useQuery(DISPLAY_MEMBER_LEADERSHIP, {
    variables: { id: memberId },
  })
  const { data: adminData } = useQuery(DISPLAY_MEMBER_ADMIN, {
    variables: { id: memberId },
  })
  const errorToThrow: any = error
  throwToSentry(errorToThrow)

  const member: Member = bioData?.members[0]
  const memberChurch = churchData?.members[0]
  const memberLeader = leaderData?.members[0]
  const memberAdmin = adminData?.members[0]
  const memberBirthday = getMemberDob(member)

  return (
    <Container>
      <RoleView
        roles={[
          ...permitSheepSeeker(),
          ...permitAdmin('Constituency'),
          ...permitLeader('Fellowship'),
        ]}
      >
        <EditButton link="/member/editmember" />
      </RoleView>

      <div className="d-flex justify-content-center pb-4">
        <PlaceholderCustom
          as="div"
          className="profile-img profile-img-height mx-auto"
          loading={!member || loading}
          xs={12}
        >
          <CloudinaryImage
            className="profile-img bg-secondary"
            src={member?.pictureUrl || USER_PLACEHOLDER}
            alt={`${member?.fullName}`}
            size="large"
          />
        </PlaceholderCustom>
      </div>

      <div className="text-center">
        <PlaceholderCustom as="h3" loading={!member || loading}>
          <h3>{member?.nameWithTitle}</h3>
        </PlaceholderCustom>
        <MemberRoleList memberLeader={memberLeader} memberAdmin={memberAdmin} />
      </div>
      <Row>
        <Col>
          <DetailsCard heading="First Name" detail={member?.firstName} />
        </Col>
        <Col>
          <DetailsCard heading="Last Name" detail={member?.lastName || ''} />
        </Col>
        {member?.middleName && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Middle Name"
              detail={member?.middleName || ' '}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <DetailsCard heading="Gender" detail={member?.gender?.gender} />
        </Col>
        <Col>
          <DetailsCard
            heading="Marital Status"
            detail={member?.maritalStatus?.status}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={1} md="auto">
          <DetailsCard heading="Date of Birth" detail={memberBirthday || ''} />
        </Col>
        <Col sm={1} md="auto">
          <a href={`tel:${member?.phoneNumber}`}>
            <DetailsCard
              heading="Phone Number"
              loading={!member?.phoneNumber}
              detail={'+' + member?.phoneNumber}
            />
          </a>
        </Col>

        <Col sm={1} md="auto">
          <a href={`https://wa.me/${member?.whatsappNumber}`}>
            <DetailsCard
              heading="Whatsapp Number"
              loading={!member?.whatsappNumber}
              detail={'+' + member?.whatsappNumber}
            />
          </a>
        </Col>
      </Row>
      <Row>
        {member?.occupation?.occupation && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Occupation"
              detail={member?.occupation?.occupation || ''}
            />
          </Col>
        )}
        {member?.email && (
          <Col sm={1} md="auto">
            <DetailsCard heading="Email Address" detail={member?.email} />
          </Col>
        )}
        {member?.visitationArea && (
          <Col sm={1} md="auto">
            <DetailsCard
              heading="Location for IDL"
              detail={member?.visitationArea.toString()}
            />
          </Col>
        )}

        <Col sm={1} md="auto">
          <DetailsCard
            heading="Fellowship"
            detail={memberChurch?.fellowship?.name}
          />
        </Col>
        {memberChurch?.ministry && (
          <Col>
            <DetailsCard
              heading="Ministry"
              detail={memberChurch?.ministry?.name}
            />
          </Col>
        )}

        {member?.titleConnection?.edges[0]?.node.title && (
          <Col sm={1} md="auto">
            <DetailsCard heading="Pastoral Rank" detail={member.currentTitle} />
          </Col>
        )}

        <Row className="mt-5">
          <Col>
            <PlaceholderCustom>
              <h3>Church History</h3>
            </PlaceholderCustom>
          </Col>
          <Col className="col-auto">
            <ViewAll to={`/member/history`} />
          </Col>
        </Row>
        <Timeline record={memberChurch?.history} limit={3} />
      </Row>
    </Container>
  )
}

export default MemberDisplay
