import CloudinaryImage, {
  CloudinaryImageProps,
} from 'components/CloudinaryImage'
import PlaceholderCustom from 'components/Placeholder'
import { MemberWithoutBioData } from 'global-types'
import { getFirstLetterInEveryWord } from 'global-utils'
import { Col, Row } from 'react-bootstrap'

const MemberAvatarWithName = ({
  member,
  loading,

  ...rest
}: {
  member: MemberWithoutBioData
  loading?: boolean
} & Omit<CloudinaryImageProps, 'src'>) => {
  const isLoading = loading || !member

  return (
    <Row className="g-0">
      <Col xs="auto" className="pe-2">
        <PlaceholderCustom
          className="img-search-placeholder"
          as="div"
          xs={12}
          loading={isLoading}
        >
          <CloudinaryImage
            className="list-img-search-placeholder"
            {...rest}
            src={member?.pictureUrl}
          />
        </PlaceholderCustom>
      </Col>
      <Col>
        <PlaceholderCustom loading={isLoading} as="h2" xs={12}>
          <div>
            {member?.firstName +
              ' ' +
              getFirstLetterInEveryWord(member?.middleName) +
              ' ' +
              member?.lastName}
          </div>
        </PlaceholderCustom>
      </Col>
    </Row>
  )
}

export default MemberAvatarWithName
