'use client'

import React, { useRef, useState } from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { contentProfessionAbout, contentInternshipCompanies } from './content'
import ItemCompaniesDesktop from './ItemCompaniesDesktop'

interface ProfessionModalDesktopProps {
    closeModal: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalDesktop: React.FC<ProfessionModalDesktopProps> = ({ closeModal, profession, professionId }) => {
    console.log('Номер id: ', { professionId })

    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)
    console.log('itemWidth ', itemWidth)
    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    const scrollbarWidth = `${((contentInternshipCompanies.length * itemWidth) / (contentRef.current?.offsetWidth || window.innerWidth)) * 150}%`
    console.log('scrollbarWidth: ', scrollbarWidth)

    /*const visibleWidth = contentRef.current?.offsetWidth || window.innerWidth
    console.log('visibleWidth ', visibleWidth)
    const totalContentWidth = contentInternshipCompanies.length * itemWidth
    console.log('totalContentWidth ', totalContentWidth)
    const scrollbarWidth = `${(visibleWidth / totalContentWidth) * 100}%`
    console.log('scrollbarWidth: ', scrollbarWidth)*/

    return (
        <Modal
            show={true}
            onClose={closeModal}
            size="large-l"
            showCloseButton={false}
            className="px-[clamp(180px,_14vw,_277px)]"
        >
            <div className="flex flex-col modal-padding-content-lg-dsk border border-red-500">
                <button onClick={closeModal} className="absolute top-[23px] right-[36px]">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="mb-[5px] text46px_desktop font-medium text-gradient_desktop_custom uppercase">
                    {profession}
                </h2>
                {contentProfessionAbout.map((item) => (
                    <p key={item.id} className="max-w-[1190px] mr-[clamp(56px,_4.6vw,_88px)] text18px_modal_desktop">
                        {item.text}
                    </p>
                ))}
                <h3 className="mt-[clamp(33px,_2.7vw,_52px)] mb-[clamp(25px,_2vw,_39px)] text28px_modal_desktop uppercase">
                    Компании для стажировки:
                </h3>
                <div className="border border-yellow-500">
                    <div
                        ref={contentRef}
                        onScroll={handleScroll}
                        className="w-full flex gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll no-scrollbar_custom select-none border border-red-500"
                    >
                        {contentInternshipCompanies.map((item) => (
                            <ItemCompaniesDesktop
                                key={item.id}
                                image={item.image}
                                price={item.price}
                                onWidthChange={setItemWidth}
                            />
                        ))}
                    </div>
                    <div
                        ref={scrollbarRef}
                        onScroll={handleScrollbarScroll}
                        className="relative h-[14px] w-[65%] mx-auto mt-[clamp(28px,_2vw,_43px)] overflow-x-scroll scrollbar_custom cursor-pointer border border-red-500"
                    >
                        <div className="absolute h-2 border border-red-500" style={{ width: scrollbarWidth }}></div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProfessionModalDesktop
