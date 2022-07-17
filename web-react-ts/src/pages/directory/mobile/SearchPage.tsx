import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import MobileSearchNav from 'components/MobileSearchNav'
import {
  STREAM_SEARCH,
  COUNCIL_SEARCH,
  CONSTITUENCY_SEARCH,
  FEDERAL_SEARCH,
  BACENTA_SEARCH,
  FELLOWSHIP_SEARCH,
} from './SearchQuery'
import { MemberContext, SearchContext } from 'contexts/MemberContext'
import MemberDisplayCard from 'components/card/MemberDisplayCard'
import { isAuthorised, throwErrorMsg } from 'global-utils'
import { Container, Spinner } from 'react-bootstrap'
import { Church, MemberWithoutBioData, Stream } from 'global-types'
type FederalSearchResult = {
  federalMemberSearch: MemberWithoutBioData[]
  federalStreamSearch: Stream[]
  federalCouncilSearch: Church[]
  federalConstituencySearch: Church[]
  federalBacentaSearch: Church[]
  federalFellowshipSearch: Church[]
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

  const [federalSearch, { loading: federalLoading, error: federalError }] =
    useLazyQuery(FEDERAL_SEARCH, {
      onCompleted: (data: FederalSearchResult) => {
        setCombinedData([
          ...data.federalMemberSearch,
          ...data.federalStreamSearch,
          ...data.federalCouncilSearch,
          ...data.federalConstituencySearch,
          ...data.federalBacentaSearch,
          ...data.federalFellowshipSearch,
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
    federalError ||
    streamError ||
    councilError ||
    constituencyError ||
    bacentaError ||
    fellowshipError

  throwErrorMsg('', error)

  const loading =
    federalLoading ||
    streamLoading ||
    councilLoading ||
    constituencyLoading ||
    bacentaLoading ||
    fellowshipLoading

  useEffect(() => {
    const whichSearch = (searchString: string) => {
      if (isAuthorised(['adminGatheringService'], currentUser.roles)) {
        federalSearch({
          variables: { searchKey: searchString?.trim() },
        })
      } else if (
        isAuthorised(['adminStream', 'leaderStream'], currentUser.roles)
      ) {
        streamSearch({
          variables: {
            streamId: currentUser.stream,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(['adminCouncil', 'leaderCouncil'], currentUser.roles)
      ) {
        councilSearch({
          variables: {
            councilId: currentUser.council,
            searchKey: searchString?.trim(),
          },
        })
      } else if (
        isAuthorised(
          ['adminConstituency', 'leaderConstituency'],
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
    federalSearch,
    fellowshipSearch,
  ])

  return (
    <>
      <MobileSearchNav />
      {loading && (
        <Container className="text-center">
          <Spinner animation="grow" className="mt-5" />
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
