'use client'

import TitleMobi from '@/components/mobi/shared/TitleMobi'
import { useAvailableCompanies } from '@/hooks/useAvailibleCompanies'
import React from 'react'
import Image from 'next/image'

const CompaniesSectionMobi: React.FC = () => {
    const { companies } = useAvailableCompanies()

    return (
        <section className="flex max-w-full flex-col gap-4 px-[15px] pb-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title="Компании" href="/companies" />
            <div className="scrollbar_custom mx-auto mb-[20px] flex w-full justify-left gap-2 overflow-y-hidden overflow-x-scroll py-[20px]">
                {companies.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        className="sm_s:[99px] sm:[99px] flex h-[45px] w-[116px] shrink-0 items-center justify-center rounded-[16px] border-2 border-[#878797] sm:h-[38px] sm_s:h-[38px]"
                    >
                        <Image width={52} height={20} src={item.logoPath} alt={item.name} className="object-contain" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CompaniesSectionMobi
