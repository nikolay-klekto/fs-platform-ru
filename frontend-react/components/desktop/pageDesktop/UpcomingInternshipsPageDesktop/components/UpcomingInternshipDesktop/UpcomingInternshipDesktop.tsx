'use client'

import Link from 'next/link'
import { content } from '@/components/desktop/pageDesktop/UpcomingInternshipsPageDesktop/contentUpcomingInternshipsPageDesktop/content'
import { Button } from '@/components/ui/button'
import ItemCardUpcomingInternshipsDesktop from '../ItemCardUpcomingInternshipsDesktop/ItemCardUpcomingInternshipsDesktop'

const UpcomingInternshipDesktop: React.FC = () => {
    const hasInternships = content && content.length > 0

    return (
        <>
            {!hasInternships && (
                <div className="flex flex-col items-center pb-[370px]">
                    <p className="mb-4 text-7xl font-medium leading-[40px] text-[#353652]">
                        Предстоящих стажировок нет
                    </p>
                    <Link href={'/professions'}>
                        <Button
                            variant={'select_desktop'}
                            size={'select_btn_type_internship_desktop'}
                            className="border-2"
                        >
                            Выбрать профессию
                        </Button>
                    </Link>
                </div>
            )}

            {hasInternships && (
                <div className="grid">
                    <div className="mx-auto flex flex-col justify-between gap-[80px] pb-[88px] 2xl:pb-[40px]">
                        {content.map((item) => (
                            <ItemCardUpcomingInternshipsDesktop key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
export default UpcomingInternshipDesktop
