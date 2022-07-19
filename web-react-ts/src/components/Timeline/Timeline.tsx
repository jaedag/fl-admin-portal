import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChurchContext } from '../../contexts/ChurchContext'
import './Timeline.css'
import { parseDate, parseNeoTime } from 'jd-date-utils'
import { Member } from 'global-types'

export type TimelineElement = {
  historyRecord: string
  loggedBy: Member
  timeStamp: string
  created_at: {
    date: string
  }
}

type TimelineProps = {
  limit: number
  modifier?: 'church'
  record: TimelineElement[]
}

const Timeline = (props: TimelineProps) => {
  const { record, limit, modifier } = props

  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  if (!record) {
    return null
  }
  if (record && modifier === 'church') {
    return (
      <ul className="timeline">
        {record.map(
          (element: TimelineElement, index: number) =>
            index < 5 && (
              <li key={index}>
                <p className="timeline-text">
                  {element.historyRecord}
                  <br />
                  <small className="text-secondary">
                    {`${parseDate(element.created_at?.date)} at ${parseNeoTime(
                      element.timeStamp
                    )}`}
                    {element?.loggedBy && ' by'}
                    <span
                      className="font-weight-bold"
                      onClick={() => {
                        clickCard(element?.loggedBy)
                        navigate('/member/displaydetails')
                      }}
                    >
                      {element?.loggedBy &&
                        ` ${element?.loggedBy?.firstName} ${element?.loggedBy?.lastName}`}
                    </span>
                  </small>
                </p>
              </li>
            )
        )}
      </ul>
    )
  }

  return (
    <ul className="timeline">
      {record.map(
        (element, index) =>
          index < limit && (
            <li key={index}>
              <p className="timeline-text">
                {element.historyRecord}
                <br />
                <small className="text-secondary">
                  {`${parseDate(element.created_at?.date)} at ${parseNeoTime(
                    element.timeStamp
                  )}`}
                  {element?.loggedBy && ' by '}
                  <span
                    className="font-weight-bold"
                    onClick={() => {
                      clickCard(element?.loggedBy)
                      navigate('/member/displaydetails')
                    }}
                  >
                    {element?.loggedBy &&
                      `${element?.loggedBy?.firstName} ${element?.loggedBy?.lastName}`}
                  </span>
                </small>
              </p>
            </li>
          )
      )}
    </ul>
  )
}

export default Timeline
