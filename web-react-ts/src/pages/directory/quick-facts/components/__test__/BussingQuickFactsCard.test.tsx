import { render, cleanup } from '@testing-library/react'
import React from 'react'
import BussingQuickFactsCard from '../BussingQuickFactsCard'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

const bussingDetails = [
  {
    churchType: 'Bacenta',
    cardType: 'Bussing',
    leadersName: 'Edem Ahadzi',
    churchName: 'Madina Bacenta',
    churchBussingThisMonth: '23',
    avgHigherLevelBussingThisMonth: '63',
    higherLevelName: 'Madina Council',
  },
]

afterEach(cleanup)

it('renders without crashing', () => {
  render(<BussingQuickFactsCard bussingDetails={bussingDetails} />)
})

it('renders Bussing Card with correct details', () => {
  const { getByTestId } = render(
    <BussingQuickFactsCard bussingDetails={bussingDetails} />
  )
  expect(getByTestId('bussingCard')).toHaveTextContent('Bussing')
})

it('matches snapshot', () => {
  const tree = renderer
    .create(<BussingQuickFactsCard bussingDetails={bussingDetails} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
