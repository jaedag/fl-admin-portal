import { gql } from '@apollo/client'

export const GLOBAL_SEARCH = gql`
  query globalSearch($searchKey: String) {
    globalSearch(searchKey: $searchKey, first: 10) {
      memberID
      firstName
      lastName
      pictureUrl
      centre {
        name
        community {
          town {
            apostle {
              memberID
            }
          }
        }
        hall {
          campus {
            apostle {
              memberID
            }
          }
        }
      }
      sonta {
        name
      }
    }
  }
`
