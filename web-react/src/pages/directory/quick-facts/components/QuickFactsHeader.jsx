import React, { useContext } from 'react'
import QuickFactsSelect from './QuickFactsSelect'
import '../QuickFacts.css'
import { useNavigate } from 'react-router'
import { ChurchContext } from 'contexts/ChurchContext'
import { MemberContext } from 'contexts/MemberContext'
import { ArrowRightCircle, ArrowLeftCircle } from 'react-bootstrap-icons'

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
        <ArrowLeftCircle size={25} />
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
        <ArrowRightCircle size={25} />
      </div>
    </div>
  )
}

export default QuickFactsHeader
