'use client'

import React, { useEffect, useState } from 'react'
import EventsFilterCategoryMobi from './components/EventsFilterCategoryMobi'

interface Props {
    onClose: () => void
}

const EventsFilterModalMobi: React.FC<Props> = ({ onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>('Выставка/презентация')

    useEffect(() => {
        document.body.classList.add('overflow-hidden')
        return () => {
            document.body.classList.remove('overflow-hidden')
        }
    }, [])

    return (
        <div className="fixed inset-0 z-[1] flex flex-col bg-black/80 backdrop-blur-sm">
            <div className="relative mt-auto max-h-[90vh] w-full overflow-y-auto rounded-t-[40px] bg-[#101030] px-[14px] pb-10 pt-[24px] text-white">
                <div className="mx-auto mb-4 h-[4px] w-[40px] rounded-full bg-[#353652]" />
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-[20px] font-semibold">Фильтр</h2>
                    <button className="text-[12px] font-medium text-[#878797] underline">Очистить</button>
                </div>

                <EventsFilterCategoryMobi
                    selectedCategory={selectedCategory}
                    onSelect={(cat) => setSelectedCategory(cat)}
                />

                <div className="h-[40px]" />

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-[14px] font-medium text-white underline"
                >
                    Закрыть
                </button>
            </div>
        </div>
    )
}

export default EventsFilterModalMobi
