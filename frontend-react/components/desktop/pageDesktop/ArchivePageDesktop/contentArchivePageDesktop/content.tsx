export interface IContent {
  id: number
  companyName: string
  profession: string
  dates: string
  image: string        
  rating: number
}

export const content: IContent[] = [
  {
      id: 1,
      companyName: 'EPAM',
      profession: 'Программист',
      dates: '25.10.2023 – 18.10.2023, Стажировка наблюдателя',
      image: '/images/archive_1.jpg',
      rating: 0,
  },
  {
      id: 2,
      companyName: 'EPAM',
      profession: 'Программист',
      dates: '25.10.2023 – 18.10.2023, Стажировка наблюдателя',
      image: '/images/archive_2.jpg',
      rating: 0,
  },
  {
      id: 3,
      companyName: 'EPAM',
      profession: 'Программист',
      dates: '25.10.2023 – 18.10.2023, Стажировка наблюдателя',
      image: '/images/archive_3.jpg',
      rating: 0,
  },
  {
      id: 4,
      companyName: 'EPAM',
      profession: 'Программист',
      dates: '25.10.2023 – 18.10.2023, Стажировка наблюдателя',
      image: '/images/archive_4.jpg',
      rating: 0,
  },
]
