import PlaceholderCustom from 'components/Placeholder'
import { ChurchContext } from 'contexts/ChurchContext'
import { ChurchLevelLower } from 'global-types'
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  LabelList,
  Legend,
} from 'recharts'
import { capitalise } from '../../global-utils'
import './ChurchGraph.css'

type ChurchGraphProps = {
  loading?: boolean
  stat1: 'attendance' | 'income'
  stat2: 'attendance' | 'income' | 'target' | null
  churchData: any[]
  secondaryTitle?: string
  bussing?: boolean
  income: boolean
  church: ChurchLevelLower | string
}

const ChurchGraph = (props: ChurchGraphProps) => {
  const { loading, stat1, stat2, churchData, secondaryTitle, bussing, income } =
    props
  const { clickCard } = useContext(ChurchContext)
  const navigate = useNavigate()

  const [sortedData, setSortedData] = useState<any[]>([])
  const [dataMax, setDataMax] = useState<{
    attendance: number
    income: number
    target: number
  }>({ attendance: 0, income: 0, target: 0 })

  type WeekSortObject = {
    week: number
  }

  useEffect(() => {
    setSortedData(
      churchData?.sort((a: WeekSortObject, b: WeekSortObject) => {
        if (a.week - b.week < -4 || a.week - b.week > 4) {
          return -1 * a.week - b.week
        }

        return a.week - b.week
      })
    )

    setDataMax({
      attendance:
        Math.max.apply(
          Math,
          churchData?.map((max: any) => {
            return max.attendance
          })
        ) * 1.2,
      income:
        Math.max.apply(
          Math,
          churchData?.map((max: any) => {
            return max.income
          })
        ) + 1.2,
      target:
        Math.max.apply(
          Math,
          churchData?.map((max: any) => {
            return max.target
          })
        ) + 1.2,
    })
  }, [churchData])

  type CustomToolTipProps = {
    payload?: any
    label?: string
    active?: boolean
  }
  const CustomTooltip = ({ active, payload, label }: CustomToolTipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Week ${label}`}</p>
          <p className="intro">{`${payload[0].name}: ${payload[0].value}`}</p>
          {payload[1] && (
            <p className="intro">{`${payload[1].name}: ${payload[1].value}`}</p>
          )}
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      )
    }

    return null
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <PlaceholderCustom loading={loading} as="p">
          <p className="chart-title font-weight-bold m-0">
            {stat2 && `${capitalise(stat1)} and ${capitalise(stat2)}`}
            {!stat2 &&
              income &&
              `${bussing && 'Bussing'} ${capitalise(stat1)} Graph`}
            {!income && `${capitalise(stat1)}`}
          </p>
        </PlaceholderCustom>
        {secondaryTitle && (
          <PlaceholderCustom loading={loading} as="p">
            <p className="chart-title church-name">{`${secondaryTitle}`}</p>
          </PlaceholderCustom>
        )}
        {!loading && (
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={sortedData} margin={{ top: 20 }}>
              <defs>
                <linearGradient
                  id="colorPrimary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--chart-primary-color)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="80%"
                    stopColor="var(--chart-primary-color)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
                <linearGradient
                  id="colorSecondary"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--chart-secondary-color)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="80%"
                    stopColor="var(--chart-secondary-color)"
                    stopOpacity="0.1"
                  />
                </linearGradient>
              </defs>

              <Bar
                name={capitalise(stat1)}
                dataKey={`${stat1}`}
                barSize={30}
                yAxisId="left"
                fill="url(#colorPrimary)"
                onClick={(data) => {
                  if (
                    data.category === 'bussingAggregate' ||
                    data.category === 'serviceAggregate' ||
                    data.category === 'multiplicationAggregate'
                  ) {
                    return
                  }

                  if (data.id && bussing) {
                    clickCard({ ...data, __typename: 'BussingRecord' })
                    navigate(`/${props.church}/bussing-details`)
                  } else if (data.id) {
                    clickCard({ ...data, __typename: 'ServiceRecord' })
                    navigate(`/${props.church}/service-details`)
                  }
                }}
              >
                <LabelList
                  dataKey={`${stat1}`}
                  position="top"
                  fill="#FFF"
                  fontSize="12"
                />
              </Bar>
              {stat2 && (
                <Bar
                  name={capitalise(stat2)}
                  dataKey={`${stat2}`}
                  barSize={35}
                  yAxisId="right"
                  fill="url(#colorSecondary)"
                  onClick={(data) => {
                    if (
                      data.category === 'bussingAggregate' ||
                      data.category === 'serviceAggregate' ||
                      data.category === 'multiplicationAggregate'
                    ) {
                      return
                    }

                    if (data.id && bussing) {
                      clickCard({ ...data, __typename: 'BussingRecord' })
                      navigate(`/${props.church}/bussing-details`)
                    } else if (data.id) {
                      clickCard({ ...data, __typename: 'ServiceRecord' })
                      navigate(`/${props.church}/service-details`)
                    }
                  }}
                >
                  <LabelList
                    dataKey={`${stat2}`}
                    position="top"
                    fill="#FFF"
                    fontSize="12"
                  />
                </Bar>
              )}

              <XAxis
                dataKey="week"
                tickLine={false}
                fontSize="13"
                tickFormatter={(week) => {
                  if (!week) {
                    return 'No Data Found'
                  }
                  return 'Week ' + week
                }}
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, dataMax[`${stat1}`]]}
                yAxisId="left"
                orientation="left"
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, stat2 ? dataMax[`${stat2}`] : '']}
                yAxisId="right"
                orientation="right"
              />

              <Tooltip
                wrapperStyle={{
                  background: 'rgba(24, 24, 24, 0.3)',
                }}
                content={<CustomTooltip />}
                contentStyle={{
                  backgroundColor: 'rgba(24, 24, 24, 0.2)',
                  color: '#FFFFFF',
                }}
                cursor={{ stroke: 'grey', strokeWidth: 1, fillOpacity: 0 }}
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default ChurchGraph
