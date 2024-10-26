interface IContent {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
    currency: string
    time: string
    id: number
}

export const content: IContent[] = [
    {
        textBlack: 'Стажировка',
        textColor: 'наблюдателя',
        textBlackBr: 'для любой профессии',
        price: 123,
        currency: 'BYN',
        time: 'неделя',
        id: 1,
    },
    {
        textBlack: 'Стажировка',
        textColor: 'с участием в рабочих процессах ',
        textBlackBr: 'для любой профессии',
        price: 123,
        currency: 'BYN',
        time: 'неделя',
        id: 2,
    },
]
