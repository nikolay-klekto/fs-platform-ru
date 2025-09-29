import { loadAvailableCompaniesServer } from './loadCompanies/loadAvailableCompaniesServer'
import { loadExistingProfessionsServer } from './loadProfessions/loadAvailableExistingProfessions'
import { loadAllActualEventsServer } from './loadEvents/loadAllActualEventsServer'
import { ICompany } from '@/types/companies/company'
import { IProfessions } from '@/types/professions/professions'
import { IEvent } from '@/types/events/event'

export const initialLoaders = [
    {
        key: 'companies',
        loader: async () => (await loadAvailableCompaniesServer()) as ICompany[],
    },
    {
        key: 'professions',
        loader: async () => (await loadExistingProfessionsServer()) as IProfessions[],
    },
    {
        key: 'events',
        loader: async () => (await loadAllActualEventsServer()) as IEvent[],
    },
] as const
