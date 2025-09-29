import { ICompany } from '@/types/companies/company'
import { IProfessions } from '@/types/professions/professions'
import { IEvent } from '../events/event'

export interface IDataContext {
    companies: ICompany[]
    professions: IProfessions[]
    events: IEvent[]
}
