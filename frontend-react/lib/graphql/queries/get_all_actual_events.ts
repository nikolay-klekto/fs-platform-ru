import { gql } from '@apollo/client'

export const GET_ALL_ACTUAL_EVENTS = gql`
    query getCardsAllActualEvents {
        getAllActualEvents {
            id
            date
            description
            name
            publicPlaceName
            site
            price
            time
            organizer
            city {
                id
                name
            }
            eventCategory {
                id
                category
            }
        }
    }
`
