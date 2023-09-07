import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import MobileSearchNav from 'components/MobileSearchNav'
import {
  STREAM_SEARCH,
  COUNCIL_SEARCH,
  CONSTITUENCY_SEARCH,
  CAMPUS_SEARCH,
  BACENTA_SEARCH,
  FELLOWSHIP_SEARCH,
  OVERSIGHT_SEARCH,
} from './SearchQuery'
import { MemberContext, SearchContext } from 'contexts/MemberContext'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { isAuthorised, throwToSentry } from 'global-utils'
import { Container } from 'react-bootstrap'
import { Church, MemberWithoutBioData, Stream } from 'global-types'
import { permitMe } from 'permission-utils'
import { ScaleLoader } from 'react-spinners'

type OversightSearchResult = {
  oversightMemberSearch: MemberWithoutBioData[]
  oversightCampusSearch: Church[]
  oversightStreamSearch: Stream[]
  oversightCouncilSearch: Church[]
  oversightConstituencySearch: Church[]
  oversightBacentaSearch: Church[]
  oversightFellowshipSearch: Church[]
}
type CampusSearchResult = {
  campusMemberSearch: MemberWithoutBioData[]
  campusStreamSearch: Stream[]
  campusCouncilSearch: Church[]
  campusConstituencySearch: Church[]
  campusBacentaSearch: Church[]
  campusFellowshipSearch: Church[]
}

type StreamSearchResult = {
  streamMemberSearch: MemberWithoutBioData[]
  streamCouncilSearch: Church[]
  streamConstituencySearch: Church[]
  streamBacentaSearch: Church[]
  streamFellowshipSearch: Church[]
}

type CouncilSearchResult = {
  councilMemberSearch: MemberWithoutBioData[]
  councilConstituencySearch: Church[]
  councilBacentaSearch: Church[]
  councilFellowshipSearch: Church[]
}

type ConstituencySearchResult = {
  constituencyMemberSearch: MemberWithoutBioData[]
  constituencyBacentaSearch: Church[]
  constituencyFellowshipSearch: Church[]
}

type BacentaSearchResults = {
  bacentaMemberSearch: MemberWithoutBioData[]
  bacentaFellowshipSearch: Church[]
}

type FellowshipSearchResults = {
  fellowshipMemberSearch: MemberWithoutBioData[]
}

type SearchResult = MemberWithoutBioData | Church

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { currentUser } = useContext(MemberContext)

  const [combinedData, setCombinedData] = useState<SearchResult[]>([])

  const [
    oversightSearch,
    { loading: oversightLoading, error: oversightError },
  ] = useLazyQuery(OVERSIGHT_SEARCH, {
    onCompleted: (data: OversightSearchResult) => {
      setCombinedData([
        ...data.oversightMemberSearch,
        ...data.oversightCampusSearch,
        ...data.oversightStreamSearch,
        ...data.oversightCouncilSearch,
        ...data.oversightConstituencySearch,
        ...data.oversightBacentaSearch,
        ...data.oversightFellowshipSearch,
      ])
      return
    },
  })

  const [campusSearch, { loading: campusLoading, error: campusError }] =
    useLazyQuery(CAMPUS_SEARCH, {
      onCompleted: (data: CampusSearchResult) => {
        setCombinedData([
          ...data.campusMemberSearch,
          ...data.campusStreamSearch,
          ...data.campusCouncilSearch,
          ...data.campusConstituencySearch,
          ...data.campusBacentaSearch,
          ...data.campusFellowshipSearch,
        ])
        return
      },
    })

  const [streamSearch, { loading: streamLoading, error: streamError }] =
    useLazyQuery(STREAM_SEARCH, {
      onCompleted: (data: StreamSearchResult) => {
        setCombinedData([
          ...data.streamMemberSearch,
          ...data.streamCouncilSearch,
          ...data.streamConstituencySearch,
          ...data.streamBacentaSearch,
          ...data.streamFellowshipSearch,
        ])
        return
      },
    })

  const [councilSearch, { loading: councilLoading, error: councilError }] =
    useLazyQuery(COUNCIL_SEARCH, {
      onCompleted: (data: CouncilSearchResult) => {
        setCombinedData([
          ...data.councilMemberSearch,
          ...data.councilConstituencySearch,
          ...data.councilBacentaSearch,
          ...data.councilFellowshipSearch,
        ])
        return
      },
    })
  const [
    constituencySearch,
    { loading: constituencyLoading, error: constituencyError },
  ] = useLazyQuery(CONSTITUENCY_SEARCH, {
    onCompleted: (data: ConstituencySearchResult) => {
      setCombinedData([
        ...data.constituencyMemberSearch,
        ...data.constituencyBacentaSearch,
        ...data.constituencyFellowshipSearch,
      ])
      return
    },
  })

  const [bacentaSearch, { loading: bacentaLoading, error: bacentaError }] =
    useLazyQuery(BACENTA_SEARCH, {
      onCompleted: (data: BacentaSearchResults) => {
        setCombinedData([
          ...data.bacentaMemberSearch,
          ...data.bacentaFellowshipSearch,
        ])
        return
      },
    })

  const [
    fellowshipSearch,
    { loading: fellowshipLoading, error: fellowshipError },
  ] = useLazyQuery(FELLOWSHIP_SEARCH, {
    onCompleted: (data: FellowshipSearchResults) => {
      setCombinedData([...data.fellowshipMemberSearch])
      return
    },
  })
  const error =
    oversightError ||
    campusError ||
    streamError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    fellowshipError

  throwToSentry('', error)

  const loading =
    oversightLoading ||
    campusLoading ||
    streamLoading ||
    councilLoading ||
    constituencyLoading ||
    bacentaLoading ||
    fellowshipLoading

  useEffect(() => {
    const whichSearch = (searchString: string) => {
      if (isAuthorised(permitMe('Oversight'), currentUser.roles)) {
        oversightSearch({
          variables: {
            oversightId: currentUser.oversight,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Campus'), currentUser.roles)) {
        campusSearch({
          variables: {
            gatheringId: currentUser.campus,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Stream'), currentUser.roles)) {
        streamSearch({
          variables: {
            streamId: currentUser.stream,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Council'), currentUser.roles)) {
        councilSearch({
          variables: {
            councilId: currentUser.council,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Constituency'), currentUser.roles)) {
        constituencySearch({
          variables: {
            constituencyId: currentUser.constituency,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Bacenta'), currentUser.roles)) {
        bacentaSearch({
          variables: {
            bacentaId: currentUser.bacenta,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(permitMe('Fellowship'), currentUser.roles)) {
        fellowshipSearch({
          variables: {
            fellowshipId: currentUser.fellowship,
            searchKey: searchString?.trim(),
          },
        })
      }
    }

    whichSearch(searchKey)
  }, [
    searchKey,
    currentUser,
    bacentaSearch,
    constituencySearch,
    councilSearch,
    streamSearch,
    campusSearch,
    fellowshipSearch,
  ])

  return (
    <>
      <MobileSearchNav />
      {loading && (
        <Container className="mt-5 pt-5 d-flex align-items-center justify-content-center">
          <ScaleLoader color="gray" className="mt-5" />
        </Container>
      )}

      <Container>
        {combinedData.length === 0 && !loading && (
          <Container className="text-center py-5">
            No results to display
          </Container>
        )}
        {!loading &&
          combinedData.slice(0, 10).map((searchResult, index) => {
            return <MemberDisplayCard key={index} member={searchResult} />
          })}
      </Container>
    </>
  )
}

export default SearchPageMobile
