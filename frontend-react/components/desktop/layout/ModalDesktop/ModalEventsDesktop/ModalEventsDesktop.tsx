'use client'

import React, { useState } from 'react';
import Modal from '@/components/ui/modal';
import { contentModalEvents } from './content';
import ModalEventsCardDesktop from './ModalEventsCardDesktop';
import { Button } from '@/components/ui/button';
import { ModalIcon } from '@/components/assets/icons';
import { MapPin, CalendarCheck, Calendar, Clock4, Users, Ellipsis, Banknote, X} from 'lucide-react';

const ModalEventsDesktop: React.FC = () => {
    const [showModal, setShowModal] = useState(true);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
           <button onClick={handleOpenModal}>Открыть модальное окно</button>

           {showModal && (
                <Modal
                    show={showModal}
                    onClose={handleCloseModal}
                    size="large-"
                    showCloseButton={false}
                >
                    {contentModalEvents.map((event) => (
                        <div 
                            key={event.id} 
                            className="flex flex-col pt-[50px] px-[20px] pb-[20px]">
                            <button 
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4">
                                <X size={41} color="white" className="opacity-70" />
                            </button>
                            <img 
                                src={event.image} 
                                alt="Фото" 
                                className="w-full h-auto object-cover rounded-[50px]"
                            />
                            
                            <div className="flex flex-col p-[20px] rounded-[25px] bg-[#1F203F] mt-[16px] mb-[10px]">
                                <h3 className="text-[36px] mb-[10px] text-gradient_desktop_custom font-medium uppercase">
                                    {event.title}
                                </h3>
                                <p className="text-[18px] text-[#878797] text-left font-medium leading-[22px]">
                                    {event.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <ModalEventsCardDesktop 
                                    icon={
                                        <MapPin color="#878797" size={24} />
                                    }
                                    title="МЕСТО"
                                    info={`${event.location.city}, ул. ${event.location.street} ${event.location.number}`}
                                />
                                <ModalEventsCardDesktop 
                                    icon={
                                        <Users color="#878797" size={24} />
                                    }
                                    title="ОРГАНИЗАТОР"
                                    info={event.organizer.name}
                                    link={event.organizer.link}
                                />
                                <ModalEventsCardDesktop
                                    icon={
                                        <Calendar color="#878797" size={24} />
                                    }
                                    title="ДАТА"
                                    info={`${event.date.data} (${event.date.day})`}
                                />
                                <ModalEventsCardDesktop 
                                    icon={
                                        <Banknote color="#878797" size={24} />
                                    }
                                    title="ЦЕНА"
                                    info={`${event.price} BYN`}
                                />
                                <ModalEventsCardDesktop
                                    icon={
                                        <Clock4 color="#878797" size={24} />
                                    }
                                    title="ВРЕМЯ"
                                    info={`${event.time.begin} - ${event.time.end}`}
                                />
                                <ModalEventsCardDesktop
                                    icon={
                                        <CalendarCheck color="#878797" size={24} />
                                    }
                                    title="ОТМЕТИТЬ В GOOGLE КАЛЕНДАРЕ"
                                    info={
                                        <div className="relative bg-[#101030] rounded-[20px]">
                                            <Button
                                                variant="accent_desktop"
                                                size="circleModalDesk"
                                                className="bg-[#ffffff1a] hover:shadow-lg hover:shadow-[#3B51A8] absolute right-0 bottom-[-40px]"
                                            >
                                                <a href={event.googleCalendarLink} target="_blank" rel="noopener noreferrer">
                                                    <ModalIcon />
                                                </a>
                                            </Button>
                                        </div>
                                    }
                                    style={{
                                        backgroundImage: "url('/background/subtract_events_modal.svg')",
                                        backgroundSize: 'contain, cover',
                                        backgroundPosition: 'center, center',
                                        backgroundRepeat: 'no-repeat, no-repeat',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                                <ModalEventsCardDesktop
                                    icon={
                                        <div style={{ alignSelf: 'flex-start' }}>
                                            <Ellipsis color="#878797" size={24} />
                                        </div>
                                    }
                                    title={
                                        <a 
                                            className="text-[28px] text-[white] font-medium hover:text-[#382D90] transition-colors duration-300" 
                                            href={event.moreInfoLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                                ПОДРОБНЕЕ
                                        </a>
                                    }
                                    style={{ padding: '64px 20px' }}
                                />
                            </div>
                        </div>
                    ))}
                </Modal>
            )}
        </>
    );
};

export default ModalEventsDesktop;