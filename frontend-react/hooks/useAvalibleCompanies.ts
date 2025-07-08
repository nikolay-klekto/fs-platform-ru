'use client'
import { useQuery, gql } from '@apollo/client'

interface RawCompany {
  id: string
  companyIndustry: string
  name: string
  site: string
  shortDescription: string
  workTime: string
  pricePerWeek:string
}

interface Company extends RawCompany {
  imagePath: string
}

const imageMap: Record<string, string> = {
  "Сбербанк": "45.webp",
  "Innowise": "78.webp",
  "Epam": "79.webp",
};


interface CompaniesQueryResponse {
  getAllAvailableCompanies: RawCompany[]
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
  const { data, loading, error, refetch } = useQuery<CompaniesQueryResponse>(
    GET_ALL_AVAILABLE_COMPANIES,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  const companies: Company[] =
    data?.getAllAvailableCompanies.map((company) => ({
      ...company,
      imagePath: `/api/photo/companies/facade/${imageMap[company.name] }`, 
    })) ?? []

  return {
    companies,
    loading,
    error,
    refetch,
  }
}
