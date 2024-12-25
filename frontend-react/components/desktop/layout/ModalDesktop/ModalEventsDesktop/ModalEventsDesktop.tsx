'use client'

import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { contentModalEvents } from './content'
import ModalEventsCardDesktop from './ModalEventsCardDesktop'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'
import { MapPin, CalendarCheck, Calendar, Clock4, Users, Ellipsis, Banknote, X} from 'lucide-react'

const ModalEventsDesktop: React.FC = () => {
    const [eventsModalOpen, setEventsModalOpen] = useState(true)

    const handleOpenEventsModal = () => {
        setEventsModalOpen(true)
    }

    const handleCloseEventsModal = () => {
        setEventsModalOpen(false)
    }

    return (
        <>
            {eventsModalOpen && (
                <Modal
                    show={eventsModalOpen}
                    onClose={handleCloseEventsModal}
                    size="large-width-884"
                    showCloseButton={false}
                    paddingClass="pt-[68px]"
                > 
                    <div className="scrollbar-modal_desktop_custom rounded-[50px]">
                        {contentModalEvents.map((event) => (
                            <div 
                                key={event.id} 
                                className="flex flex-col pt-[50px] px-[20px] pb-[20px]">
                                <button 
                                    onClick={handleCloseEventsModal}
                                    className="absolute top-4 right-4 z-10">
                                    <X size={41} color="white" className="hover:opacity-100 opacity-70 transition-opacity duration-300" />
                                </button>
                                <img 
                                    src={event.image} 
                                    alt="Фото" 
                                    className="w-full h-auto object-cover rounded-[50px]"
                                />
                                
                                <div className="flex flex-col p-[20px] rounded-[25px] bg-[#1F203F] mt-[16px] mb-[10px]">
                                    <h3 className="text36px_desktop mb-[10px] text-gradient_desktop_custom font-medium uppercase">
                                        {event.title}
                                    </h3>
                                    <p className="text-[18px] text-[#878797] text-left font-medium leading-[22px]">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <ModalEventsCardDesktop
                                        className="items-center"
                                        icon={
                                            <MapPin color="#878797" size={24} />
                                        }
                                        title="МЕСТО"
                                        info={event.location}
                                    />
                                    <ModalEventsCardDesktop 
                                        className="items-center"
                                        icon={
                                            <Users color="#878797" size={24} />
                                        }
                                        title="ОРГАНИЗАТОР"
                                        info={event.organizer.name}
                                        link={event.organizer.link}
                                    />
                                    <ModalEventsCardDesktop
                                        className="items-center"
                                        icon={
                                            <Calendar color="#878797" size={24} />
                                        }
                                        title="ДАТА"
                                        info={`${event.date.data} (${event.date.day})`}
                                    />
                                    <ModalEventsCardDesktop 
                                        className="items-center"
                                        icon={
                                            <Banknote color="#878797" size={24} />
                                        }
                                        title="ЦЕНА"
                                        info={`${event.price} BYN`}
                                    />
                                    <ModalEventsCardDesktop
                                        className="items-center"
                                        icon={
                                            <Clock4 color="#878797" size={24} />
                                        }
                                        title="ВРЕМЯ"
                                        info={`${event.time.begin} - ${event.time.end}`}
                                    />
                                    <ModalEventsCardDesktop
                                        className="bg-transparent bg-no-repeat bg-center items-center"
                                        style={{
                                            backgroundImage: "url('/background/subtract_events_modal.webp')",
                                            backgroundSize: "contain"
                                        }}
                                        icon={
                                            <CalendarCheck color="#878797" size={24} />
                                        }
                                        title="ОТМЕТИТЬ В GOOGLE КАЛЕНДАРЕ"
                                        info={
                                            <div className="relative bg-[#101030] rounded-[20px]">
                                                <Button
                                                    variant="accent_desktop"
                                                    size="circle_modal_desk"
                                                    className="bg-[#ffffff1a] absolute right-0 bottom-[-40px]"
                                                >
                                                    <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer">
                                                        <ForwardIcon fill="white" stroke="white" width={'29.25px'}/>
                                                    </a>
                                                </Button>
                                            </div>
                                        }
                                    />
                                    <ModalEventsCardDesktop                   
                                        className="pt-[64px] pb-[64px] pl-[20px] items-start"
                                        icon={
                                            <div>
                                                <Ellipsis color="#878797" size={24} />
                                            </div>
                                        }
                                        title={
                                            <a 
                                                className="text28px_desktop text-[white] font-medium hover:text-[#382D90] transition-colors duration-300" 
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
            )}
        </>
    )
}

export default ModalEventsDesktop