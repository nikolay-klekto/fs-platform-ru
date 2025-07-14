'use client'
import { useQuery, gql } from '@apollo/client'

interface IRawProfession {
  id: string
  description: string
	name: string
	clientsNumber: string
	professionIndustry: string
	pricePerWeek: string
  internshipTypeId: string
  }

interface IProfession extends IRawProfession {
  imagePath: string
}

interface IProfessionsQueryResponse {
  getAllExistingProfessions: IRawProfession[]
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
    internshipTypeId
    }
  }
`

export function useExistingProfessions() {
  const { data, loading, error, refetch } = useQuery<IProfessionsQueryResponse>(
    GET_ALL_EXISTING_PROFESSIONS,
    {
      fetchPolicy: 'cache-and-network',
    }
  )

  const professions: IProfession[] =
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
