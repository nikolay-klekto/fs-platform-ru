export interface IRawEvent {
    id: string
    date: string
    description: string
    name: string
    publicPlaceName: string
    site: string
    price: string
    time: string
    organizer: string
    city: {
        id: string
        name: string
    }
    eventCategory: {
        id: string
        category: string
    }
    __typename?: string
}

export interface IEvent extends IRawEvent {
    imagePath: string
}
