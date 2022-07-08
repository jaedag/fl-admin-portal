import React, { useContext, useState, useEffect } from 'react'
import { Button, Card, Container, Spinner, Table } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import { STREAM_BANKING_DEFAULTERS_LIST } from 'pages/services/defaulters/DefaultersQueries'
import { useQuery, useMutation } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Formik, Form, FormikHelpers } from 'formik'
import FormikControl from 'components/formik-components/FormikControl'
import { useNavigate } from 'react-router-dom'
import usePopup from 'hooks/usePopup'
import { CONFIRM_BANKING } from './Treasury.gql'
import CloudinaryImage from 'components/CloudinaryImage'
import { ServiceContext } from 'contexts/ServiceContext'
import { DISPLAY_FELLOWSHIP_SERVICE } from 'pages/services/record-service/RecordServiceMutations'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'

type FormOptions = {
  defaulterSearch: string
}

type Defaulter = {
  bacenta: {}
  id: string
  leader: { pictureUrl: string; fullName: string }
  meetingDay: { day: string }
  name: string
  services: [{}]
  __typename: string
}

const ConfirmAnagkazoBanking = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const church = currentUser?.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { streamId, clickCard, fellowshipId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const [defaultersData, setDefaultersData] = useState([])
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()

  const { data, loading, error, refetch } = useQuery(
    STREAM_BANKING_DEFAULTERS_LIST,
    {
      variables: { id: streamId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const { data: fellowshipServiceData } = useQuery(DISPLAY_FELLOWSHIP_SERVICE, {
    variables: { serviceId: serviceRecordId, fellowshipId: fellowshipId },
  })

  const [ConfirmBanking] = useMutation(CONFIRM_BANKING)

  const service = fellowshipServiceData?.serviceRecords[0]
  const banking_defaulters_list = data?.streams[0]?.bankingDefaultersThisWeek

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    setDefaultersData(
      banking_defaulters_list.filter((defaulter: Defaulter) =>
        defaulter.name
          .toLowerCase()
          .includes(values.defaulterSearch.toLowerCase())
      )
    )

    onSubmitProps.setSubmitting(false)
  }

  useEffect(() => {
    setDefaultersData(banking_defaulters_list)
  }, [banking_defaulters_list])

  const initialValues: FormOptions = {
    defaulterSearch: '',
  }

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${church?.name} ${churchType}`}</h1>
            <p className={`${theme} menu-subheading`}>Receive Banking</p>
          </div>
        </PlaceholderCustom>

        {isOpen && (
          <Popup handleClose={togglePopup}>
            <h6>Confirm This Fellowship Offering</h6>
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <td>Income</td>
                  <td>{service?.income}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className={`btn-main ${theme}`}
              disabled={isSubmitting}
              onClick={async () => {
                setSubmitting(true)

                try {
                  await ConfirmBanking({
                    variables: {
                      serviceRecordId: service.id,
                    },
                  })
                  togglePopup()
                  alertMsg('Banking Confirmed Successfully')

                  setSubmitting(false)
                  refetch({ id: streamId })
                  navigate('/anagkazo/receive-banking')
                } catch (error) {
                  setSubmitting(false)
                  throwErrorMsg(error)
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="grow" size="sm" />
                  <span> Submitting</span>
                </>
              ) : (
                `Yes, I'm sure`
              )}
            </Button>
            <Button
              variant="primary"
              className={`btn-secondary mt-2 ${theme}`}
              onClick={togglePopup}
            >
              No, take me back
            </Button>
          </Popup>
        )}

        <ApolloWrapper data={data} loading={loading} error={error}>
          <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {() => (
                <Form>
                  <div>
                    <FormikControl
                      className="form-control church-search search-center"
                      control="input"
                      name="defaulterSearch"
                      placeholder="Search Churches"
                      aria-describedby="Defaulter Search"
                    />
                  </div>
                </Form>
              )}
            </Formik>
            <div className="text-center mt-2 mb-3">Week {getWeekNumber()}</div>
            <Container>
              <div className="d-grid ">
                {defaultersData?.map((defaulter: Defaulter, index: number) => (
                  <Card key={index} className="confirm-banking-card">
                    <div
                      onClick={() => {
                        clickCard(defaulter)
                        clickCard(defaulter.services[0])
                        navigate('/fellowship/service-details')
                      }}
                      className="d-flex align-items-center"
                    >
                      <div className="flex-shrink-0">
                        <CloudinaryImage
                          className="rounded-circle img-search"
                          src={defaulter?.leader.pictureUrl}
                          alt={defaulter?.leader?.fullName}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="fw-bold">{`${defaulter?.name} Fellowship`}</h6>
                        <p className={`text-secondary mb-0 ${theme}`}>
                          <span>{defaulter?.leader?.fullName}</span>
                        </p>
                      </div>
                    </div>

                    <Card.Footer className="text-center">
                      <Button
                        onClick={() => {
                          clickCard(defaulter)
                          clickCard(defaulter.services[0])

                          togglePopup()
                        }}
                        variant="info"
                      >
                        Confirm Banking
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            </Container>
          </div>
        </ApolloWrapper>
      </Container>
    </div>
  )
}
export default ConfirmAnagkazoBanking
