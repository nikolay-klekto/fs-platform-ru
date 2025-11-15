import { gql } from '@apollo/client'

export const GET_ALL_COMPANIES_BY_PROFESSION_ID = gql`
    query getAllCompaniesByProfessionId ($id: ID!)  {
        getAllCompaniesByProfessionId(id: $id) {
            id
            companyIndustry
            legalCapacityStatus
            name
            site
            shortDescription
            pricePerWeek
        }
    }
`
