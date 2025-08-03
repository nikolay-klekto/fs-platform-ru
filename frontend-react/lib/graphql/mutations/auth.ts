import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(client: { email: $email, password: $password }) {
            data {
                accessToken
                refreshToken
                clientId
            }
            errorMessage
        }
    }
`

export const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $phoneNumber: String!, $password: String!) {
        register(client: { email: $email, phoneNumber: $phoneNumber, password: $password }) {
            data {
                accessToken
                refreshToken
                clientId
            }
            errorMessage
        }
    }
`
