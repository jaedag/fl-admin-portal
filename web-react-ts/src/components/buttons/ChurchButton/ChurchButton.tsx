import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './ChurchButton.css'
import useSetUserChurch from 'hooks/useSetUserChurch'

type ChurchButtonProps = {
  church: {
    id: string
    name: string
    __typename: string
  }
}

const ChurchButton = (props: ChurchButtonProps) => {
  const { church } = props
  const { clickCard } = useContext(ChurchContext)
  const { setUserFinancials } = useSetUserChurch()

  return (
    <PlaceholderCustom
      as="div"
      className="card-buttons py-2 px-3 text-center text-nowrap text-white"
    >
      <Link to={`/${church.__typename.toLowerCase()}/displaydetails`}>
        <button
          className="card-buttons py-2 px-3 text-center text-nowrap text-white"
          onClick={() => {
            clickCard(church)
            if (church.__typename === 'GatheringService') {
              setUserFinancials(church)
            }
          }}
        >
          {church.name}
        </button>
      </Link>
    </PlaceholderCustom>
  )
}

export default ChurchButton
