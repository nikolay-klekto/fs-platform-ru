import { gql, useQuery } from '@apollo/client'

interface EventType {
    id: string
    date: string
    description: string
    name: string
    publicPlaceName: string
    site: string
    price: string
    city: {
        id: string
        name: string
    }
    time: string
    organizer: string
    eventCategory: {
        id: string
        category: string
    }
}

const GET_ALL_ACTUAL_EVENTS = gql`
    query {
        getAllActualEvents {
            id
            date
            description
            name
            publicPlaceName
            site
            price
            city {
                id
                name
            }
            time
            organizer
            eventCategory {
                id
                category
            }
        }
    }
`

interface GetAllActualEventsResult {
    getAllActualEvents: EventType[]
}

export function useAllActualEvents() {
    const { data, error, loading } = useQuery<GetAllActualEventsResult>(GET_ALL_ACTUAL_EVENTS)
    return {
        events: data?.getAllActualEvents,
        loading,
        error,
    }
}
