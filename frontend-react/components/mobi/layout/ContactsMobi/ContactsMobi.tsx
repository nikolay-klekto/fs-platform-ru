import React from 'react'

import { Button } from '@/components/ui/button'
import {
    contentContactsMobi,
    contentSocialContactsFirstMobi,
    contentSocialContactsSecondMobi,
} from './contentContactsMobi'

const ContactsMobi: React.FC = () => {
    return (
        <>
            <div className="pt-10 pb-[335px] px-[15px]">
                <div className="flex flex-col gap-4 pb-10">
                    <h2 className="text-9xl font-medium uppercase">Cвяжитесь с нами</h2>
                    <div className="w-[159px]">
                        <Button variant="select_btn_mobi" size="select_mobi">
                            Хочу в команду
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between w-full border border-red-500">
                    <div className="flex flex-col">
                        {contentContactsMobi.map((item) => (
                            <div
                                key={item.id}
                                className={`${item.id !== contentContactsMobi.length ? 'pb-[20px]' : ''}`}
                            >
                                <p className="pb-2.5px text-base font-semibold text-white/50">{item.title}</p>
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[21px] font-semibold"
                                    >
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-5xl font-semibold">{item.value}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 pt-[49.2px] pb-[39.3px] w-full sm_s:grid-cols-1 sm_s:gap-5 sm:grid-cols-1 sm:gap-5 border border-red-500">
                    <div className="flex flex-col justify-between h-[73px]">
                        {contentSocialContactsFirstMobi.map((item) => (
                            <a key={item.id} href={item.href} className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center justify-center w-[24.7px] h-[26.4px] rounded-full bg-gradient-desktop hover:bg-gradient-desktop-hover md:w-[27px] md:h-[29px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <p className="text-xs font-medium md:text-base">{item.name}</p>
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col justify-between h-[73px]">
                        {contentSocialContactsSecondMobi.map((item) => (
                            <a key={item.id} href={item.href} className="flex items-center gap-2 max-w-[300px]">
                                <div>
                                    <div className="flex items-center justify-center w-[24.7px] h-[26.4px] rounded-full bg-gradient-desktop hover:bg-gradient-desktop-hover md:w-[27px] md:h-[29px]">
                                        {item.icon}
                                    </div>
                                </div>
                                <p className="text-xs font-medium md:text-base">{item.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsMobi
