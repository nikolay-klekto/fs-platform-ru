import { createApolloServerClient } from '@/lib/apollo/apolloClient'
import { GET_ALL_COMPANIES_BY_PROFESSION_ID } from '@/lib/graphql/queries/get_all_companies_by_profession_id'
import { getLogoPath } from '@/lib/constants/imageMaps'
import { ICompanyOfProfession } from '@/types/companyOfProfession/companyOfProfession'
export async function loadCompaniesOfProfession(id: number): Promise<ICompanyOfProfession[]> {
    const client = createApolloServerClient()

    const { data } = await client.query({
        query: GET_ALL_COMPANIES_BY_PROFESSION_ID,
        variables: { id },
        fetchPolicy: 'network-only',
    })

    return data.getAllCompaniesByProfessionId.map((company: ICompanyOfProfession) => ({
        ...company,
        logoPath: getLogoPath(company.name),
    }))
}
