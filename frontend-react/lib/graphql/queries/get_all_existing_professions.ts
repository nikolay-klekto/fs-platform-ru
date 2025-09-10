import { gql } from '@apollo/client'

export const GET_ALL_EXISTING_PROFESSIONS = gql`
    query getCardsAllExistingProfessions {
        getAllExistingProfessions {
            id
            description
            name
            clientsNumber
            professionIndustry
            pricePerWeek
            internshipTypeId
        }
    }
`
