import React, { useContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import MobileSearchNav from '../../components/MobileSearchNav.jsx'
import {
  BISHOP_SEARCH,
  CONSTITUENCY_SEARCH,
  FEDERAL_NEO_SEARCH,
} from './SearchQuery'
import { MemberContext, SearchContext } from '../../contexts/MemberContext'
import Spinner from '../../components/Spinner.jsx'
import MemberDisplayCard from '../../components/card/MemberDisplayCard'
import { isAuthorised } from 'global-utils.js'

const SearchPageMobile = () => {
  const { searchKey } = useContext(SearchContext)
  const { currentUser } = useContext(MemberContext)

  const [combinedData, setCombinedData] = useState([])

  const whichSearch = () => {
    if (isAuthorised(['federalAdmin'], currentUser.roles)) {
      return { fedkey: searchKey }
    }
    if (isAuthorised(['bishopAdmin'], currentUser.roles)) {
      return { key: searchKey, bishop: currentUser.bishop }
    }
    if (isAuthorised(['constituencyAdmin'], currentUser.roles)) {
      return { key: searchKey, constituency: currentUser.constituency }
    }
    return
  }

  const searchVars = whichSearch()

  const { data: federalData, loading: federalLoading } = useQuery(
    FEDERAL_NEO_SEARCH,
    {
      variables: { searchKey: searchVars?.fedKey },
      onCompleted: (data) => {
        if (!isAuthorised(['federalAdmin'], currentUser.roles)) {
          return
        }
        setCombinedData([
          ...data.members,
          ...data.campuses,
          ...data.towns,
          ...data.sontas,
          ...data.centres,
          ...data.bacentas,
        ])
        return
      },
    }
  )
  const { data: bishopData, loading: bishopLoading } = useQuery(BISHOP_SEARCH, {
    variables: { searchKey: searchVars?.key, bishopId: searchVars?.bishop },
    onCompleted: (data) => {
      if (!isAuthorised(['bishopAdmin'], currentUser.roles)) {
        return
      }
      setCombinedData([
        ...data.bishopMemberSearch,
        ...data.bishopCampusSearch,
        ...data.bishopTownSearch,
        ...data.bishopSontaSearch,
        ...data.bishopCentreSearch,
        ...data.bishopBacentaSearch,
      ])
      return
    },
  })
  const { data: constituencyData, loading: constituencyLoading } = useQuery(
    CONSTITUENCY_SEARCH,
    {
      variables: {
        searchKey: searchVars?.key,
        constituencyId: searchVars?.constituency ?? '',
      },
      onCompleted: (data) => {
        if (!isAuthorised(['constituencyAdmin'], currentUser.roles)) {
          return
        }

        setCombinedData([
          ...data.constituencyMemberSearch,
          ...data.constituencySontaSearch,
          ...data.constituencyCentreSearch,
          ...data.constituencyBacentaSearch,
        ])
        return
      },
    }
  )

  if (federalLoading || bishopLoading || constituencyLoading) {
    return (
      <>
        <MobileSearchNav />
        <div className="container body-container text-center">
          <div className="mt-5">
            <Spinner />
          </div>
        </div>
      </>
    )
  } else if (federalData || bishopData || constituencyData) {
    return (
      <>
        <MobileSearchNav />
        <div className="container mt-5">
          {combinedData.slice(0, 10).map((searchResult, index) => {
            return (
              <MemberDisplayCard
                key={index}
                index={index}
                member={searchResult}
              />
            )
          })}
        </div>
      </>
    )
  } else {
    return (
      <>
        <MobileSearchNav />
        <div className="container full-body-center">
          <p className="text-center full-center">
            There seems to be an error loading data
          </p>
        </div>
      </>
    )
  }
}

export default SearchPageMobile
