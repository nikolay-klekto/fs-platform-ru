'use client'
import { useQuery, gql } from '@apollo/client'

interface IRawCompany {
    id: string
    companyIndustry: string
    name: string
    site: string
    shortDescription: string
    workTime: string
    pricePerWeek: string
}

interface ICompany extends IRawCompany {
    imagePath: string
    logoPath: string
}

const imageMap: Record<string, string> = {
    Сбербанк: '45.webp',
    Innowise: '78.webp',
    Epam: '79.webp',
}

const logoMap: Record<string, string> = {
    Сбербанк: '45.png',
    Innowise: '78.png',
    Epam: '79.png',
}

interface ICompaniesQueryResponse {
    getAllAvailableCompanies: IRawCompany[]
}

const GET_ALL_AVAILABLE_COMPANIES = gql`
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

export function useAvailableCompanies() {
    const { data, loading, error, refetch } = useQuery<ICompaniesQueryResponse>(GET_ALL_AVAILABLE_COMPANIES, {
        fetchPolicy: 'cache-and-network',
    })

    const companies: ICompany[] =
        data?.getAllAvailableCompanies.map((company) => ({
            ...company,
            imagePath: `/api/photo/companies/facade/${imageMap[company.name]}`,
            logoPath: `/api/photo/companies/logo/${logoMap[company.name]}`,
        })) ?? []

    return {
        companies,
        loading,
        error,
        refetch,
    }
}
