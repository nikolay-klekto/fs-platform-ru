import { ReactNode } from 'react'
import { Banknote, CircleCheck, FileText, Search } from 'lucide-react'

interface IContent {
    title: string
    icon: ReactNode
    description: string[]
    id: number
}

export const content: IContent[] = [
    {
        title: 'выбор професии',
        icon: <Search color="white" width={50} height={50} />,
        description: ['- выбор профессии и компании', '-выбор варианта стажировки', '-выбор дат стажировки'],
        id: 1,
    },
    {
        title: 'оформление',
        icon: <FileText color="white" width={50} height={50} />,
        description: [
            '- заполнение необходимых данных',
            '- созвон и уточненение информации',
            '- подписание договора в офисе, либо заключение дистанционного договора',
            '- бронирование дат стажировки',
        ],
        id: 2,
    },
    {
        title: 'оплата',
        icon: <Banknote color="white" width={50} height={50} />,
        description: [
            '- оплата происходит в течении 2-ух дней с момента подписания договора',
            '-оплата доступна на сайте, в разделе "требующие оплаты", либо в офисе.',
        ],

        id: 3,
    },
    {
        title: 'стажировка',
        icon: <CircleCheck color="white" width={50} height={50} />,
        description: [
            '- вам выделяется рабочее пространство',
            '- индивидуально под ваш уровень составляется учебная программа',
            '- выход клиента в компанию',
        ],
        id: 4,
    },
]
