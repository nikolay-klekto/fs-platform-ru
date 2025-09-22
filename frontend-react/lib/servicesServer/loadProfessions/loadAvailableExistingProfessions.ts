import { createApolloServerClient } from '@/lib/apollo/apolloClient'
import { GET_ALL_EXISTING_PROFESSIONS } from '@/lib/graphql/queries/get_all_existing_professions'
import { getImagePath } from '@/lib/constants/imageMaps'
import { IProfessions } from '@/types/professions/professions'

export async function loadExistingProfessionsServer(): Promise<IProfessions[]> {
    const client = createApolloServerClient()

    const { data } = await client.query({
        query: GET_ALL_EXISTING_PROFESSIONS,
        fetchPolicy: 'network-only',
    })

    return data.getAllExistingProfessions.map((profession: IProfessions) => ({
        ...profession,
        imagePath: getImagePath('professions', profession.name),
    }))
}
