import { createApolloServerClient } from '@/lib/apollo/apolloClient'
import { GET_ALL_ACTUAL_EVENTS } from '@/lib/graphql/queries/get_all_actual_events'
import { IEvent } from '@/types/events/event'
import { getImagePath } from '@/lib/constants/imageMaps'

export async function loadAllActualEventsServer(): Promise<IEvent[]> {
    const client = createApolloServerClient()

    const { data } = await client.query({
        query: GET_ALL_ACTUAL_EVENTS,
        fetchPolicy: 'network-only',
    })

    return data.getAllActualEvents.map((event: IEvent) => ({
        ...event,
        imagePath: getImagePath('events', event.id),
    }))
}
