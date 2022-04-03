import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import MenuButton from './components/buttons/MenuButton'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { useNavigate } from 'react-router'

const CampaignChurchList = () => {
  const { currentUser, setCurrentUser, userJobs } = useContext(MemberContext)
  const { clickCard } = useContext(ChurchContext)

  const navigate = useNavigate()
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <h1 className="mb-0 ">Campaign Church List</h1>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          {userJobs?.jobs.length ? (
            userJobs.jobs.map((job) =>
              job.church.map((church, index) => (
                <MenuButton
                  key={index}
                  name={church.name}
                  onClick={() => {
                    clickCard(church)
                    setCurrentUser({
                      ...currentUser,
                      currentChurch: church,
                    })
                    sessionStorage.setItem(
                      'currentUser',
                      JSON.stringify({
                        ...currentUser,
                        currentChurch: church,
                      })
                    )
                    navigate(`/campaigns/${church.__typename.toLowerCase()}`)
                  }}
                />
              ))
            )
          ) : (
            <>
              <MenuButton />
              <MenuButton />
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default CampaignChurchList
