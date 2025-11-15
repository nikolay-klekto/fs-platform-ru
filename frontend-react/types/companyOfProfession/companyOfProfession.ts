export interface IRawCompanyOfProfession {
    id: number
    companyIndustry: string
    legalCapacityStatus: string
    name: string
    site: string
    shortDescription: string
    pricePerWeek: string
}

export interface ICompanyOfProfession extends IRawCompanyOfProfession {
    logoPath: string
}