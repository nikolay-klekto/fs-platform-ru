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

const GET_ALL_EXISTING_PROFESSIONS= gql`
  query getCardsAllExistingProfessions {
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

export function useExistingProfessions() {
  const { data, loading, error, refetch } = useQuery<ProfessionsQueryResponse>(
    GET_ALL_EXISTING_PROFESSIONS,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  const professions: Profession[] =
     data?.getAllExistingProfessions.map((profession) => ({
    ...profession,
    imagePath: `/api/photo/professions/${profession.id}.webp`,
    })) ?? []

  return {
    professions,
    loading,
    error,
    refetch,
  }
}
