import React, { useContext } from 'react'
import QuickFactsSelect from './QuickFactsSelect'
import '../QuickFacts.css'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'

const QuickFactsHeader = (props) => {
  const { clickCard } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)
  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename
  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-between page-padding">
      <div
        onClick={() => {
          clickCard(church)
          navigate(`/quick-facts/${props.previous}/${churchType.toLowerCase()}`)
        }}
      >
        <i className="fa-solid fa-circle-chevron-left"></i>
      </div>
      <div>
        <div className="quick-fact-text">Quick Facts</div>
        <div className="mx-auto mt-2 fit-content">
          <QuickFactsSelect />
        </div>
      </div>
      <div
        onClick={() => {
          clickCard(church)
          navigate(
            `/quick-facts/${props.next}/${church.__typename.toLowerCase()}`
          )
        }}
      >
        <i className="fa fa-circle-chevron-right"></i>
      </div>
    </div>
  )
}

export default QuickFactsHeader
