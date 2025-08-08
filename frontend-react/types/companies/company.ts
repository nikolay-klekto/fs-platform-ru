export interface IRawCompany {
    id: string
    companyIndustry: string
    name: string
    site: string
    shortDescription: string
    workTime: string
    pricePerWeek: string
}

export interface ICompany extends IRawCompany {
    imagePath: string
}
