import { createApolloServerClient } from '@/lib/apollo/apolloClient'
import { GET_FEEDBACK_BY_PROFESSION_ID } from '@/lib/graphql/queries/get_feedback_by_profession_id'
import { IFeedback } from '@/types/professionFeedback/professionFeedback' 

export async function loadProfessionFeedback(professionId: number): Promise<IFeedback[]> {
    const client = createApolloServerClient()

    const { data } = await client.query({
        query: GET_FEEDBACK_BY_PROFESSION_ID,
        variables: { professionId },
        fetchPolicy: 'network-only',
    })

    return data.getFeedbackByProfessionId as IFeedback[];

}
