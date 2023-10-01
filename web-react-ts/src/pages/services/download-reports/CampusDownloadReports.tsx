import { useQuery } from '@apollo/client'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { useContext } from 'react'
import { CAMPUS_DOWNLOAD_REPORTS } from './dowloadReports.gql'
import { ChurchContext } from 'contexts/ChurchContext'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const CampusDownloadReportsMenu = () => {
  const { campusId } = useContext(ChurchContext)
  const { data, loading, error } = useQuery(CAMPUS_DOWNLOAD_REPORTS, {
    variables: {
      id: campusId,
    },
  })
  const navigate = useNavigate()
  const campus = data?.campuses[0]

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary>{campus?.name} Campus Download Reports</HeadingPrimary>

        <Button
          onClick={() => navigate('/campus/download-fellowship-services')}
        >
          Download Fellowship Services This Week
        </Button>
      </Container>
    </ApolloWrapper>
  )
}

export default CampusDownloadReportsMenu
