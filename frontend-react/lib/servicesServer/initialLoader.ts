import { loadAvailableCompaniesServer } from './loadCompanies/loadAvailableCompaniesServer'
import { loadExistingProfessionsServer } from './loadProfessions/loadAvailableExistingProfessions'
import { ICompany } from '@/types/companies/company'
import { IProfessions } from '@/types/professions/professions'

export const initialLoaders = [
    {
        key: 'companies',
        loader: async () => (await loadAvailableCompaniesServer()) as ICompany[],
    },
    {
        key: 'professions',
        loader: async () => (await loadExistingProfessionsServer()) as IProfessions[],
    },
] as const
