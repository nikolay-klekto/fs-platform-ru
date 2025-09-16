import { gql } from '@apollo/client'

export const GET_FEEDBACK_BY_PROFESSION_ID = gql`
    query getFeedbackByProfessionId($professionId: ID!) {
        getFeedbackByProfessionId(professionId: $professionId) {
            id
            professionId
            question
            answer
        }
    }
`
