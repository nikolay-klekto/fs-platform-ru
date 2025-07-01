import Link from 'next/link'
import { content } from '@/components/desktop/pageDesktop/UpcomingInternshipsPageDesktop/contentUpcomingInternshipsPageDesktop/content'
import { Button } from '@/components/ui/button'

const UpcomingInternshipDesktop: React.FC = () => {
    if (!content) {
        return (
            <div className="flex flex-col items-center pb-[370px]">
                <p className="mb-4 text-7xl font-medium leading-[40px] text-[#353652]">Предстоящих стажировок нет</p>
                <Link href={'/professions'}>
                    <Button variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                        Выбрать профессию
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <>
            <div className="grid pb-[49px]">
                <div className="grid grid-cols-2 justify-between gap-[34px] self-end pb-[80px] 2xl:pb-[40px]">
                    Вставить контент
                </div>
                <Button className="flex justify-self-center" variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default UpcomingInternshipDesktop
