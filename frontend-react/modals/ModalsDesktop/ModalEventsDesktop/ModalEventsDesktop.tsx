'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin, CalendarCheck, Calendar, Clock4, Users, Ellipsis, Banknote, X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { ForwardIconDesktop } from '@/components/assets/iconsDesktop'
import { contentModalEvents } from './content'
import ModalEventsCardDesktop from './ModalEventsCardDesktop'

interface IModalContent {
    onClose: () => void
}

const ModalEventsDesktop: React.FC<IModalContent> = ({ onClose }) => {
    return (
        <>
            <Modal onClose={onClose} size="large-lg" showCloseButton={false} paddingClass="pt-[68px] pb-[26px]">
                <div className="scrollbar-modal_desktop_custom 4xl:max-h-[94vh] max-h-[90vh] rounded-[50px]">
                    {contentModalEvents.map((event) => (
                        <div key={event.id} className="flex flex-col px-[20px] pb-[20px] pt-[50px]">
                            <button onClick={onClose} className="absolute right-4 top-4 z-10">
                                <X
                                    size={41}
                                    color="white"
                                    className="opacity-70 transition-opacity duration-300 hover:opacity-100"
                                />
                            </button>
                            <Image src={event.image} alt="Фото" className="h-auto w-full rounded-[50px] object-cover" />

                            <div className="mb-[10px] mt-[16px] flex flex-col rounded-[25px] bg-[#1F203F] p-[20px]">
                                <h3 className="text36px_desktop text-gradient_desktop_custom mb-[10px] font-medium uppercase">
                                    {event.title}
                                </h3>
                                <p className="text-left text-[18px] font-medium leading-[22px] text-[#878797]">
                                    {event.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <ModalEventsCardDesktop
                                    className="items-center"
                                    icon={<MapPin color="#878797" size={24} />}
                                    title="МЕСТО"
                                    info={event.location}
                                />
                                <ModalEventsCardDesktop
                                    className="items-center"
                                    icon={<Users color="#878797" size={24} />}
                                    title="ОРГАНИЗАТОР"
                                    info={event.organizer.name}
                                    link={event.organizer.link}
                                />
                                <ModalEventsCardDesktop
                                    className="items-center"
                                    icon={<Calendar color="#878797" size={24} />}
                                    title="ДАТА"
                                    info={`${event.date.data} (${event.date.day})`}
                                />
                                <ModalEventsCardDesktop
                                    className="items-center"
                                    icon={<Banknote color="#878797" size={24} />}
                                    title="ЦЕНА"
                                    info={`${event.price} BYN`}
                                />
                                <ModalEventsCardDesktop
                                    className="items-center"
                                    icon={<Clock4 color="#878797" size={24} />}
                                    title="ВРЕМЯ"
                                    info={`${event.time.begin} - ${event.time.end}`}
                                />
                                <ModalEventsCardDesktop
                                    className="items-center bg-transparent bg-center bg-no-repeat"
                                    style={{
                                        backgroundImage: "url('/background/subtract_events_modal.webp')",
                                        backgroundSize: 'contain',
                                    }}
                                    icon={<CalendarCheck color="#878797" size={24} />}
                                    title="ОТМЕТИТЬ В GOOGLE КАЛЕНДАРЕ"
                                    info={
                                        <div className="relative rounded-[20px] bg-[#101030]">
                                            <Button
                                                variant="accent_desktop"
                                                size="circle_modal_desk"
                                                className="absolute bottom-[-40px] right-0 bg-[#ffffff1a]"
                                            >
                                                <a
                                                    href={event.googleCalendarLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ForwardIconDesktop fill="white" stroke="white" width={'29.25px'} />
                                                </a>
                                            </Button>
                                        </div>
                                    }
                                />
                                <ModalEventsCardDesktop
                                    className="items-start py-[64px] pl-[20px]"
                                    icon={
                                        <div>
                                            <Ellipsis color="#878797" size={24} />
                                        </div>
                                    }
                                    title={
                                        <a
                                            className="text28px_desktop font-medium text-[white] transition-colors duration-300 hover:text-[#382D90]"
                                            href={event.moreInfoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ПОДРОБНЕЕ
                                        </a>
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    )
}

export default ModalEventsDesktop
