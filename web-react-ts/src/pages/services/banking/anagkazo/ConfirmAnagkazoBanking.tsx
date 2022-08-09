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
import { useNavigate } from 'react-router-dom'
import usePopup from 'hooks/usePopup'
import { CONFIRM_BANKING } from './Treasury.gql'
import CloudinaryImage from 'components/CloudinaryImage'
import { ServiceContext } from 'contexts/ServiceContext'
import { DISPLAY_FELLOWSHIP_SERVICE } from 'pages/services/record-service/RecordServiceMutations'
import { alertMsg, throwErrorMsg } from 'global-utils'
import Popup from 'components/Popup/Popup'
import { ServiceRecord } from 'global-types'
import NoDataComponent from 'pages/arrivals/CompNoData'
import Input from 'components/formik/Input'

type FormOptions = {
  defaulterSearch: string
}

type Defaulter = {
  leader: { pictureUrl: string; fullName: string }
  name: string
  services: ServiceRecord[]
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
  const bankingDefaultersList = data?.streams[0]?.bankingDefaultersThisWeek

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    setDefaultersData(
      bankingDefaultersList.filter((defaulter: Defaulter) =>
        defaulter.name
          .toLowerCase()
          .includes(values.defaulterSearch.toLowerCase())
      )
    )

    onSubmitProps.setSubmitting(false)
  }

  useEffect(() => {
    setDefaultersData(bankingDefaultersList)
  }, [bankingDefaultersList])

  const initialValues: FormOptions = {
    defaulterSearch: '',
  }

  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <PlaceholderCustom xs={12} as="h1">
          <div className="text-center">
            <h1 className="mb-0  page-header">{`${church?.name} ${churchType}`}</h1>
            <p className={`${theme} menu-subheading`}>Receive Offering</p>
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
                {service?.foreignCurrency && (
                  <tr>
                    <td>Foreign Currency</td>
                    <td>{service?.foreignCurrency}</td>
                  </tr>
                )}
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
                } catch (error: any) {
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
                    <Input
                      className="form-control church-search search-center"
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
                        Confirm Offering
                      </Button>
                    </Card.Footer>
                  </Card>
                ))}
              </div>

              {!bankingDefaultersList?.length && !loading && (
                <NoDataComponent text="There are no services to be confirmed" />
              )}
            </Container>
          </div>
        </ApolloWrapper>
      </Container>
    </div>
  )
}
export default ConfirmAnagkazoBanking
