import { ICompany } from '@/types/companies/company'
import { IProfessions } from '@/types/professions/professions'

export interface IDataContext {
    companies: ICompany[]
    professions: IProfessions[]
}
