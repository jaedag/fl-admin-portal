import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
// import { DisplayChurchList } from '../components/DisplayChurchList'
import { NavBar } from '../components/NavBar'
import { ErrorScreen, LoadingScreen } from '../components/StatusScreens'
import { GET_TOWN_SONTA_LEADERS } from '../queries/ListQueries'
import { ChurchContext } from '../contexts/ChurchContext'
import { MemberContext } from '../contexts/MemberContext'

export const DisplayAllSontaTowns = () => {
  // Display Ministries per Town
  const { sontaID, townID } = useContext(ChurchContext)
  const { setMemberID } = useContext(MemberContext)

  const {
    data: sontaData,
    error: sontaError,
    loading: sontaLoading,
  } = useQuery(GET_TOWN_SONTA_LEADERS, {
    variables: { townID: townID, sontaID: sontaID },
  })

  if (sontaLoading) {
    // Spinner Icon for Loading Screens
    return <LoadingScreen />
  } else if (sontaData) {
    return (
      <div>
        <NavBar />
        <div className="body-container container">
          <div className="my-5">
            console.log(sontaData);
            {sontaData.townSontaLeader.map((leader, index) => {
              return (
                <React.Fragment key={index}>
                  <h4>{`${leader.leadsSonta.name}`}</h4>
                  <Link
                    to="/member/displaydetails"
                    onClick={() => {
                      setMemberID(`${leader.id}`)
                    }}
                  />
                  {sontaData.townSontaLeader.map((leader, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="card p-2 m-2">
                          {leader.leadsSonta.name}
                          <h6 className="text-muted">
                            Leader:
                            {`${leader.firstName} ${leader.lastName}`}
                          </h6>
                        </div>
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </div>
          {/* <DisplayChurchList data={sontaData.townSontaLeader} setter={setSontaID} churchType="Sonta" /> */}
        </div>
      </div>
    )
  } else {
    console.log(sontaError)
    return <ErrorScreen />
  }
}
