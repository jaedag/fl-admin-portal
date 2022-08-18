import { render, cleanup } from '@testing-library/react'
import React from 'react'
import IncomeQuickFactsCard from '../IncomeQuickFactsCard'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'

const incomeDetails = [
  {
    churchType: 'Bacenta',
    cardType: 'Income',
    leadersName: 'Edem Ahadzi',
    churchName: 'Madina Bacenta',
    churchAvgIncomeThisMonth: '2330',
    avgHigherLevelIncomeThisMonth: '6380',
    higherLevelName: 'Madina Council',
  },
]

afterEach(cleanup)

it('renders without crashing', () => {
  render(<IncomeQuickFactsCard incomeDetails={incomeDetails} />)
})

it('renders Income Card with correct details', () => {
  const { getByTestId } = render(
    <IncomeQuickFactsCard incomeDetails={incomeDetails} />
  )
  expect(getByTestId('incomeCard')).toHaveTextContent('Income')
})

it('matches snapshot', () => {
  const tree = renderer
    .create(<IncomeQuickFactsCard incomeDetails={incomeDetails} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
