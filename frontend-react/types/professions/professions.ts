export interface IRawProfessions {
    id: string
    clientsNumber: number
    description: string
    pricePerWeek: string
    internshipTypeId: string
    professionIndustry: string
    name: string
    __typename: string
}

export interface IProfessions extends IRawProfessions {
    imagePath: string
}
