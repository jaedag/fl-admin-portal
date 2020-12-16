import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { DisplayChurchDetails } from '../components/DisplayChurchDetails'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { DISPLAY_SONTA } from '../queries/DisplayQueries'
import { SontaContext } from '../context/ChurchContext'

export const DisplaySontaDetails = () => {
  const { sontaID } = useContext(SontaContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(DISPLAY_SONTA, {
    variables: { sontaID: sontaID },
  })

  if (sontaError) {
    return <ErrorScreen />
  } else if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  }

  return (
    <div>
      <NavBar />
      <DisplayChurchDetails
        name={sontaData.displaySonta.name}
        leaderTitle="Sonta Leader"
        leaderName={
          sontaData.displaySonta.leader
            ? `${sontaData.displaySonta.leader.firstName} ${sontaData.displaySonta.leader.lastName}`
            : '-'
        }
        membership={sontaData.sontaMemberCount}
        churchHeading="No of Basonta Leaders"
        churchNo={sontaData.displaySonta.basontas.length}
        subChurch="Basonta"
        subChurchSetter=""
        churchType=""
        buttons={['']}
      />
    </div>
  )
}
