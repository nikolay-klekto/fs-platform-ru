'use client'
import { useQuery, gql } from '@apollo/client'

interface RawProfession {
  id: string
		description: string
		name: string
		clientsNumber: string
		professionIndustry: string
		pricePerWeek: string
}

interface Profession extends RawProfession {
  imagePath: string
}

interface ProfessionsQueryResponse {
  getAllExistingProfessions: RawProfession[]
}

const GET_ALL_AVAILABLE_PROFESSIONS = gql`
  query getAllExistingProfessions {
    getAllExistingProfessions {
      id
		description
		name
		clientsNumber
		professionIndustry
		pricePerWeek
    }
  }
`

export function useAvailableProfessions() {
  const { data, loading, error, refetch } = useQuery<ProfessionsQueryResponse>(
    GET_ALL_AVAILABLE_PROFESSIONS,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  const professions: Profession[] =
    data?.getAllExistingProfessions.map((profession) => ({
      ...profession,
      imagePath: `http://45.135.234.61:8183/professions/facade/${profession.id}.jpg`,
    })) ?? []

  return {
    professions,
    loading,
    error,
    refetch,
  }
}
