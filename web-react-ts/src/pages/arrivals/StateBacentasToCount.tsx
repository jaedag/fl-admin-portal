import { useLazyQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import Input from 'components/formik/Input'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { ChurchContext } from 'contexts/ChurchContext'
import { Form, Formik, FormikHelpers } from 'formik'
import useChurchLevel from 'hooks/useChurchLevel'
import PlaceholderDefaulterList from 'pages/services/defaulters/PlaceholderDefaulterList'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ArrivalsUseChurchType, BacentaWithArrivals } from './arrivals-types'
import {
  CONSTITUENCY_BACENTAS_TO_COUNT,
  COUNCIL_BACENTAS_TO_COUNT,
  GATHERINGSERVICE_BACENTAS_TO_COUNT,
  STREAM_BACENTAS_TO_COUNT,
} from './bussingStatusQueries'
import NoData from './CompNoData'
import VehicleButton from './components/VehicleButton'

type FormOptions = {
  bacentaSearch: string
}

const StateBacentasToCount = () => {
  const { clickCard } = useContext(ChurchContext)
  const [constituencyOnTheWay] = useLazyQuery(CONSTITUENCY_BACENTAS_TO_COUNT)
  const [councilOnTheWay] = useLazyQuery(COUNCIL_BACENTAS_TO_COUNT)
  const [streamOnTheWay] = useLazyQuery(STREAM_BACENTAS_TO_COUNT)
  const [gatheringServiceOnTheWay] = useLazyQuery(
    GATHERINGSERVICE_BACENTAS_TO_COUNT
  )

  const data: ArrivalsUseChurchType = useChurchLevel({
    constituencyFunction: constituencyOnTheWay,
    councilFunction: councilOnTheWay,
    streamFunction: streamOnTheWay,
    gatheringServiceFunction: gatheringServiceOnTheWay,
  })
  const { church, loading, error } = data

  // Searching Feature

  const initialValues: FormOptions = {
    bacentaSearch: '',
  }
  const bacentaDataLoaded = church ? church?.bacentasNotCounted : []
  const [bacentaData, setBacentaData] = useState<
    BacentaWithArrivals[] | undefined
  >([])

  useEffect(() => {
    setBacentaData(bacentaDataLoaded)
  }, [church])

  console.log(church?.bacentasNotCounted)
  const onSubmit = (
    values: FormOptions,
    onSubmitProps: FormikHelpers<FormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)
    const searchTerm = values.bacentaSearch.toLowerCase()
    setBacentaData(
      church?.bacentasNotCounted.filter((bacenta: BacentaWithArrivals) => {
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
    <ApolloWrapper data={church} loading={loading} error={error} placeholder>
      <Container>
        <>
          <HeadingPrimary loading={loading}>Bacentas To Count</HeadingPrimary>
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
            <NoData text="There are no bacentas to be counted" />
          )}

          {bacentaData?.map((bacenta: BacentaWithArrivals) =>
            bacenta.bussing[0].vehicleRecords.map((record, i) => (
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
                  <VehicleButton record={record} />
                </div>
              </MemberDisplayCard>
            ))
          )}

          {!church?.bacentasNotCounted.length && loading && (
            <PlaceholderDefaulterList />
          )}
        </>
      </Container>
    </ApolloWrapper>
  )
}

export default StateBacentasToCount
