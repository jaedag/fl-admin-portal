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
  CREATIVEARTS_SEARCH,
  MINISTRY_SEARCH,
  HUB_SEARCH,
} from './SearchQuery'
import { MemberContext, SearchContext } from 'contexts/MemberContext'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { isAuthorised, throwToSentry } from 'global-utils'
import { Container } from 'react-bootstrap'
import { ScaleLoader } from 'react-spinners'
import {
  BacentaSearchResults,
  CampusSearchResult,
  ConstituencySearchResult,
  CouncilSearchResult,
  CreativeArtsSearchResult,
  FellowshipSearchResults,
  HubSearchResult,
  MinistrySearchResult,
  OversightSearchResult,
  SearchResult,
  StreamSearchResult,
} from './search-types'

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
          ...data.campusCreativeArtsSearch,
          ...data.campusMinistrySearch,
          ...data.campusHubSearch,
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
          ...data.streamMinistrySearch,
          ...data.streamHubSearch,
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
          ...data.councilHubSearch,
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

  const [
    creativeArtsSearch,
    { loading: creativeArtsLoading, error: creativeArtsError },
  ] = useLazyQuery(CREATIVEARTS_SEARCH, {
    onCompleted: (data: CreativeArtsSearchResult) => {
      setCombinedData([
        ...data.creativeArtsMemberSearch,
        ...data.creativeArtsMinistrySearch,
        ...data.creativeArtsHubSearch,
        ...data.creativeArtsHubFellowshipSearch,
      ])
      return
    },
  })

  const [ministrySearch, { loading: ministryLoading, error: ministryError }] =
    useLazyQuery(MINISTRY_SEARCH, {
      onCompleted: (data: MinistrySearchResult) => {
        setCombinedData([
          ...data.ministryMemberSearch,
          ...data.ministryHubSearch,
          ...data.ministryHubFellowshipSearch,
        ])
        return
      },
    })
  const [hubSearch, { loading: hubLoading, error: hubError }] = useLazyQuery(
    HUB_SEARCH,
    {
      onCompleted: (data: HubSearchResult) => {
        setCombinedData([
          ...data.hubMemberSearch,
          ...data.hubHubFellowshipSearch,
        ])
        return
      },
    }
  )

  const error =
    oversightError ||
    campusError ||
    streamError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    fellowshipError ||
    creativeArtsError ||
    ministryError ||
    hubError

  throwToSentry('', error)

  const loading =
    oversightLoading ||
    campusLoading ||
    streamLoading ||
    councilLoading ||
    constituencyLoading ||
    bacentaLoading ||
    fellowshipLoading ||
    creativeArtsLoading ||
    ministryLoading ||
    hubLoading

  useEffect(() => {
    const whichSearch = (searchString: string) => {
      if (
        isAuthorised(['leaderOversight', 'adminOversight'], currentUser.roles)
      ) {
        oversightSearch({
          variables: {
            oversightId: currentUser.oversight,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(['leaderCampus', 'adminCampus'], currentUser.roles)
      ) {
        campusSearch({
          variables: {
            campusId: currentUser.campus,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(
          ['leaderCreativeArts', 'adminCreativeArts'],
          currentUser.roles
        )
      ) {
        creativeArtsSearch({
          variables: {
            creativeArtsId: currentUser.creativeArts,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(['leaderStream', 'adminStream'], currentUser.roles)
      ) {
        streamSearch({
          variables: {
            streamId: currentUser.stream,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(['leaderMinistry', 'adminMinistry'], currentUser.roles)
      ) {
        ministrySearch({
          variables: {
            ministryId: currentUser.ministry,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(['leaderCouncil', 'adminCouncil'], currentUser.roles)
      ) {
        councilSearch({
          variables: {
            councilId: currentUser.council,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(['leaderHub'], currentUser.roles)) {
        hubSearch({
          variables: {
            hubId: currentUser.hub,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(
          ['leaderConstituency', 'adminConstituency'],
          currentUser.roles
        )
      ) {
        constituencySearch({
          variables: {
            constituencyId: currentUser.constituency,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(['leaderBacenta'], currentUser.roles)) {
        bacentaSearch({
          variables: {
            bacentaId: currentUser.bacenta,
            searchKey: searchString?.trim(),
          },
        })
      } else if (isAuthorised(['leaderFellowship'], currentUser.roles)) {
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
    oversightSearch,
    creativeArtsSearch,
    ministrySearch,
    hubSearch,
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
          combinedData.map((searchResult, index) => {
            return <MemberDisplayCard key={index} member={searchResult} />
          })}
      </Container>
    </>
  )
}

export default SearchPageMobile
