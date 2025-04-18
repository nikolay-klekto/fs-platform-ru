'use client'

import TitleMobi from '@/components/mobi/shared/TitleMobi'
import { contentInternshipCompaniesMobi } from '@/components/mobi/layout/ProfessionModalMobi/content'
import ItemCompaniesMobi from '@/components/mobi/layout/ProfessionModalMobi/ItemCompaniesMobi'

const CompaniesSectionMobi: React.FC = () => {
    return (
        <section className="flex max-w-full flex-col gap-4 px-[15px] py-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title="Компании" href="/companies" />
            <div className="scrollbar_custom mx-auto mb-[20px] flex w-full gap-2 overflow-y-hidden overflow-x-scroll py-[20px]">
                {contentInternshipCompaniesMobi.map((item) => (
                    <ItemCompaniesMobi key={item.id} image={item.image} onWidthChange={() => {}} />
                ))}
            </div>
        </section>
    )
}

export default CompaniesSectionMobi
