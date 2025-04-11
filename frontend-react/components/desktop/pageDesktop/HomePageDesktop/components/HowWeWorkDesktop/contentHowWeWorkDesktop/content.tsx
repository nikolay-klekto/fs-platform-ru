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
        icon: <Search color="white" className="3xl:size-[40px] size-[50px] 2xl:size-[35px]" />,
        description: ['• Выберите профессию/ компанию', '• Определите вариант стажировки', '• Укажите удобные даты'],
        id: 1,
    },
    {
        title: 'оформление',
        icon: <FileText color="white" className="3xl:size-[40px] size-[50px] 2xl:size-[35px]" />,
        description: [
            '• Заполните форму',
            '• Получите звонок от нашего менеджера',
            '• Подпишите договор в офисе или онлайн',
        ],
        id: 2,
    },
    {
        title: 'оплата',
        icon: <Banknote color="white" className="3xl:size-[40px] size-[50px] 2xl:size-[35px]" />,
        description: [
            '• Оплатите в течение 2 дней',
            '• Сделайте оплату на сайте в разделе "требующие оплаты" или в офисе',
        ],

        id: 3,
    },
    {
        title: 'стажировка',
        icon: <CircleCheck color="white" className="3xl:size-[40px] size-[50px] 2xl:size-[35px]" />,
        description: [
            '• Получите рабочее место и индивидуальную программу обучения',
            '• Начните стажировку, получите реальный опыт и возможность остаться в компании',
        ],
        id: 4,
    },
]
