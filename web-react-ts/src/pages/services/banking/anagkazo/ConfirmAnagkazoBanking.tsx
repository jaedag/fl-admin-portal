import React, { useContext, useState, useEffect, useRef } from 'react'
import { Button, Card, Container, Spinner, Table } from 'react-bootstrap'
import { MemberContext } from 'contexts/MemberContext'
import { ChurchContext } from 'contexts/ChurchContext'
import PlaceholderCustom from 'components/Placeholder'
import { getWeekNumber } from 'jd-date-utils'
import { CONSTITUENCY_BANKING_DEFUALTERS_THIS_WEEK } from 'pages/services/defaulters/DefaultersQueries'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { Formik, Form, FormikHelpers } from 'formik'
import { useNavigate } from 'react-router-dom'
import usePopup from 'hooks/usePopup'
import { CONFIRM_BANKING } from './Treasury.gql'
import CloudinaryImage from 'components/CloudinaryImage'
import { DISPLAY_AGGREGATE_SERVICE_RECORD } from 'pages/services/record-service/RecordServiceMutations'
import { alertMsg, throwToSentry } from 'global-utils'
import Popup from 'components/Popup/Popup'
import NoDataComponent from 'pages/arrivals/CompNoData'
import Input from 'components/formik/Input'

type FormOptions = {
  defaulterSearch: string
}

type Defaulter = {
  leader: { pictureUrl: string; fullName: string }
  name: string
}

const ConfirmAnagkazoBanking = () => {
  const { currentUser, theme } = useContext(MemberContext)
  const church = currentUser?.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const { streamId, clickCard, constituencyId } = useContext(ChurchContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const [defaultersData, setDefaultersData] = useState([])
  const { togglePopup, isOpen } = usePopup()
  const navigate = useNavigate()

  const { data, loading, error, refetch } = useQuery(
    CONSTITUENCY_BANKING_DEFUALTERS_THIS_WEEK,
    {
      variables: { id: streamId },
      fetchPolicy: 'cache-and-network',
    }
  )

  const [getConstituencyServiceRecordThisWeek] = useLazyQuery(
    DISPLAY_AGGREGATE_SERVICE_RECORD,
    {
      variables: { constituencyId, week: getWeekNumber() },
    }
  )

  const [ConfirmBanking] = useMutation(CONFIRM_BANKING)

  const service =
    constituencyServiceData?.constituencies[0]?.aggregateServiceRecord

  const selectedConstituencyName =
    constituencyServiceData?.constituencies[0]?.name

  const bankingDefaultersList =
    data?.streams[0]?.constitiuencyBankingDefaultersThisWeek

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

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    togglePopup()
  }, [])

  useEffect(() => {
    buttonRef?.current?.click()
  }, [])

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
              {isOpen && (
                <Popup handleClose={togglePopup}>
                  <h3 className={`${theme} menu-subheading text-center`}>
                    {selectedConstituencyName} Constituency
                  </h3>
                  <h6 className="text-center">Confirm Offering?</h6>
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
                  <i className="text-danger">
                    NB: You must only click this button if the amount the
                    constituency is submitting is the same as what is displayed
                    here
                  </i>
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
                            constituencyId: constituencyId,
                          },
                        })
                        togglePopup()
                        alertMsg('Banking Confirmed Successfully')

                        setSubmitting(false)
                        refetch({ id: streamId })
                        navigate('/anagkazo/receive-banking')
                      } catch (error: any) {
                        setSubmitting(false)
                        throwToSentry(error)
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
              <div className="d-grid ">
                {defaultersData?.map((defaulter: Defaulter, index: number) => (
                  <Card key={index} className="confirm-banking-card mt-2">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <CloudinaryImage
                          className="rounded-circle img-search"
                          src={defaulter?.leader.pictureUrl}
                          alt={defaulter?.leader?.fullName}
                        />
                      </div>

                      <div className="flex-grow-1 ms-3">
                        <h6 className="fw-bold">{`${defaulter?.name} Constituency`}</h6>
                        <p className={`text-secondary mb-0 ${theme}`}>
                          <span>{defaulter?.leader?.fullName}</span>
                        </p>
                      </div>
                    </div>
                    <Card.Footer className="text-center">
                      <Button
                        ref={buttonRef}
                        onClick={() => {
                          clickCard(defaulter)
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
