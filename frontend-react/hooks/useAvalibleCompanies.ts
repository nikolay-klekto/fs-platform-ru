import { useQuery, gql } from '@apollo/client'

interface RawCompany {
  id: string
  companyIndustry: string
  name: string
  site: string
  shortDescription: string
  workTime: string
}

interface Company extends RawCompany {
  imagePath: string
}

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
      imagePath: `http://45.135.234.61:8183/companies/facade/${company.id}.jpg`,
    })) ?? []

  return {
    companies,
    loading,
    error,
    refetch,
  }
}
