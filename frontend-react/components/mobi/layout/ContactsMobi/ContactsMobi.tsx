import React from 'react'

import { Button } from '@/components/ui/button'
import { contentContactsMobi } from './contentContactsMobi'

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
                <div className="flex justify-between w-full">
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
            </div>
        </>
    )
}

export default ContactsMobi
