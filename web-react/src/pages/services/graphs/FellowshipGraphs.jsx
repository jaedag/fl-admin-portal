import React, { useContext } from 'react'

import { ChurchContext } from '../../../contexts/ChurchContext'
import { useQuery } from '@apollo/client'
import { getServiceGraphData, getMonthlyStatAverage } from './graphs-utils'
import ChurchGraph from '../../../components/ChurchGraph/ChurchGraph'
import { FELLOWSHIP_GRAPHS } from './GraphsQueries'
import MembershipCard from './CompMembershipCard'
import StatDisplay from './CompStatDisplay'
import BaseComponent from 'components/base-component/BaseComponent'
import { MemberContext } from 'contexts/MemberContext'

export const FellowshipReport = () => {
  const { fellowshipId } = useContext(ChurchContext)
  const { currentUser } = useContext(MemberContext)

  const { data, loading, error } = useQuery(FELLOWSHIP_GRAPHS, {
    variables: { fellowshipId: fellowshipId },
  })

  const serviceData = getServiceGraphData(data?.fellowships[0])

  return (
    <BaseComponent loading={loading} error={error} data={data}>
      <div className="container">
        <div className=" my-3">
          <h5 className="mb-0">{`${data?.fellowships[0].name} Fellowship`}</h5>{' '}
          <p>
            <span className="text-secondary font-weight-bold">Leader: </span>
            {`${data?.fellowships[0].leader?.fullName}`}
          </p>
        </div>

        <div className="row">
          <div className="col">
            <MembershipCard
              link="/fellowship/members"
              title="Membership"
              count={data?.fellowships[0].memberCount}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <StatDisplay
              title="Avg Weekly Attendance"
              statistic={getMonthlyStatAverage(serviceData, 'attendance')}
            />
          </div>

          {!currentUser.noIncome && (
            <div className="col">
              <StatDisplay
                title="Avg Weekly Income"
                statistic={getMonthlyStatAverage(serviceData, 'income')}
              />
            </div>
          )}
        </div>

        {!currentUser.noIncome ? (
          <ChurchGraph
            stat1="attendance"
            stat2="income"
            income={true}
            churchData={serviceData}
            church="fellowship"
          />
        ) : (
          <ChurchGraph
            stat1="attendance"
            stat2={null}
            income={false}
            churchData={serviceData}
            church="fellowship"
          />
        )}
      </div>
    </BaseComponent>
  )
}

export default FellowshipReport
