import { render, cleanup } from '@testing-library/react'
import React from 'react'
import AttendanceQuickFactsCard from '../AttendanceQuickFactsCard'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

const attendanceDetails = [
  {
    churchType: 'Bacenta',
    cardType: 'Attendance',
    leadersName: 'Edem Ahadzi',
    churchName: 'Madina Bacenta',
    churchAvgAttendanceThisMonth: '23',
    avgHigherLevelAttendanceThisMonth: '63',
    higherLevelName: 'Madina Council',
  },
]

afterEach(cleanup)

it('renders without crashing', () => {
  render(<AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />)
})

it('renders Attendance Card with correct details', () => {
  const { getByTestId } = render(
    <AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />
  )
  expect(getByTestId('attendanceCard')).toHaveTextContent('Attendance')
})

it('matches snapshot', () => {
  const tree = renderer
    .create(<AttendanceQuickFactsCard attendanceDetails={attendanceDetails} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
