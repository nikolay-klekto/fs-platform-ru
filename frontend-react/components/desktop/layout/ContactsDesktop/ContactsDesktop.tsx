import React from 'react'

import { Button } from '@/components/ui/button'
import { contentContactsDesktop, contentSocialContactsDesktop } from './contentContactsDesktop'

const ContactsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex justify-between pt-52 pb-[297px] border border-red-500">
                <div className="flex flex-col gap-7 max-w-[541px] border border-red-500">
                    <h2 className="text-26xl font-semibold uppercase">Cвяжитесь с нами</h2>
                    <Button variant="select_desktop" size="contacts_btn">
                        Хочу в команду
                    </Button>
                </div>
                <div className="w-[1021px]">
                    <div className="flex justify-between border border-red-500">
                        <div className="flex flex-col">
                            {contentContactsDesktop.map((item) => (
                                <div
                                    key={item.id}
                                    className={`${item.id !== contentContactsDesktop.length ? 'pb-[60px]' : ''}`}
                                >
                                    <p className="pb-[5px] text-7xl font-semibold text-white/50">{item.title}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-15xl font-semibold"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-14xl font-semibold">{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col border border-red-500 justify-between pt-2.5">
                            {contentSocialContactsDesktop.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-5 max-w-[376px] border border-red-500"
                                >
                                    <a
                                        href={item.href}
                                        className="flex items-center justify-center w-[58px] h-[62px] rounded-full bg-black"
                                    >
                                        {item.icon}
                                    </a>
                                    <p className="text-7xl font-medium">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-white/50 rounded-full mt-[99px] mb-[63px]"></div>
                </div>
            </div>
        </>
    )
}

export default ContactsDesktop
