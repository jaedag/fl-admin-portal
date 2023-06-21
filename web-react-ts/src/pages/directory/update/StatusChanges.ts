import { gql } from '@apollo/client'

export const SET_VACATION_FELLOWSHIP = gql`
  mutation SetVacationFellowship($fellowshipId: ID!) {
    SetVacationFellowship(fellowshipId: $fellowshipId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_ACTIVE_FELLOWSHIP = gql`
  mutation SetActiveFellowship($fellowshipId: ID!) {
    SetActiveFellowship(fellowshipId: $fellowshipId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_ONLINE_FELLOWSHIP = gql`
  mutation SetOnlineFellowship($fellowshipId: ID!) {
    SetOnlineFellowship(fellowshipId: $fellowshipId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_VACATION_BACENTA = gql`
  mutation SetVacationBacenta($bacentaId: ID!) {
    SetVacationBacenta(bacentaId: $bacentaId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`

export const SET_ACTIVE_BACENTA = gql`
  mutation SetActiveBacenta($bacentaId: ID!) {
    SetActiveBacenta(bacentaId: $bacentaId) {
      id
      name
      vacationStatus
      history {
        id
        historyRecord
      }
    }
  }
`
