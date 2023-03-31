import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import Input from 'components/formik/Input'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik, FormikHelpers } from 'formik'
import { SHORT_POLL_INTERVAL } from 'global-utils'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import { useContext, useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import PullToRefresh from 'react-simple-pull-to-refresh'
import { BacentaWithArrivals } from './arrivals-types'
import { STREAM_VEHICLES_TO_BE_PAID } from './bussingStatusQueries'
import NoData from './CompNoData'
import VehicleButton from './components/VehicleButton'
import VehicleButtonPayment from './components/VehiclePaymentButton'

type FormOptions = {
  bacentaSearch: string
}

const StateBacentasToBePaid = () => {
  const { streamId, clickCard } = useContext(ChurchContext)
  const { data, loading, error, refetch } = useQuery(
    STREAM_VEHICLES_TO_BE_PAID,
    {
      variables: {
        id: streamId,
      },
      pollInterval: SHORT_POLL_INTERVAL,
    }
  )

  const church = data?.streams[0]

  // Searching Feature
  const initialValues: FormOptions = {
    bacentaSearch: '',
  }

  const bacentaDataLoaded = church ? church?.bacentasToBePaid : []
  const [bacentaData, setBacentaData] = useState<
    BacentaWithArrivals[] | undefined
  >([])

  useEffect(() => {
    setBacentaData(bacentaDataLoaded)
  }, [church])

  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    const searchTerm = values.bacentaSearch.toLowerCase()
    setBacentaData(
      church?.bacentasToBePaid.filter((bacenta: BacentaWithArrivals) => {
        if (bacenta.name.toLowerCase().includes(searchTerm)) {
          return true
        } else if (bacenta.leader.fullName.toLowerCase().includes(searchTerm)) {
          return true
        }

        return false
      })
    )

    onSubmitProps.setSubmitting(false)
  }

  return (
    <PullToRefresh onRefresh={refetch}>
      <ApolloWrapper data={church} loading={loading} error={error} placeholder>
        <Container>
          <>
            <HeadingPrimary loading={loading}>
              Bacentas To Be Paid
            </HeadingPrimary>
            <HeadingSecondary loading={!church?.name}>
              {church?.name} {church?.__typename}
            </HeadingSecondary>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {() => (
                <Form>
                  <div className="align-middle">
                    <Input
                      className="form-control member-search w-100"
                      name="bacentaSearch"
                      placeholder="Search Bacentas"
                      aria-describedby="Bacenta Search"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            {church && !bacentaData?.length && (
              <NoData text="There are no bacentas to be be paid" />
            )}
            {bacentaData?.map((bacenta: BacentaWithArrivals) =>
              bacenta.bussing[0].vehicleRecords.map((record, i) => {
                if (record.transactionStatus === 'success') {
                  return null
                }

                return (
                  <MemberDisplayCard
                    key={i}
                    member={bacenta}
                    leader={bacenta.leader}
                    contact
                    onClick={() => {
                      clickCard(bacenta)
                      clickCard(bacenta.bussing[0])
                    }}
                  >
                    <div className="d-grid gap-2 mt-2">
                      <VehicleButtonPayment record={record} />
                    </div>
                  </MemberDisplayCard>
                )
              })
            )}
            {!church?.bacentasToBePaid.length && loading && (
              <PlaceholderDefaulterList />
            )}
          </>
        </Container>
      </ApolloWrapper>
    </PullToRefresh>
  )
}

export default StateBacentasToBePaid
