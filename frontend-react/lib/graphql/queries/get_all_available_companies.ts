import { gql } from '@apollo/client'

export const GET_ALL_AVAILABLE_COMPANIES = gql`
    query getCardsAllAvailableCompanies {
        getAllAvailableCompanies {
            id
            companyIndustry
            name
            site
            shortDescription
            workTime
            pricePerWeek
        }
    }
`
