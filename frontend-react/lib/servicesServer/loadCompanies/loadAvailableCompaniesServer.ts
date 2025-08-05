import { createApolloServerClient } from '@/lib/apollo/apolloClient'
import { GET_ALL_AVAILABLE_COMPANIES } from '@/lib/graphql/queries/get_all_available_companies'
import { ICompany } from '@/types/companies/company'
import { getImagePath } from '@/lib/constants/imageMaps'

export async function loadAvailableCompaniesServer(): Promise<ICompany[]> {
    const client = createApolloServerClient()

    const { data } = await client.query({
        query: GET_ALL_AVAILABLE_COMPANIES,
        fetchPolicy: 'network-only',
    })

    return data.getAllAvailableCompanies.map((company: ICompany) => ({
        ...company,
        imagePath: getImagePath('companies', company.name),
    }))
}
