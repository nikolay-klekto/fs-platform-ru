'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown } from 'lucide-react'

const ProfessionsPageDesktop: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelectToggle = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <div className="relative overflow-hidden p-[76px_212px_200px_212px]">
                <h1 className="title_desktop">Professions</h1>
                <div className="radial-gradient_desktop top-[-330px]"></div>
                <div className="flex justify-between pt-[80px]">
                    <div
                        className="relative h-[64px] w-[768px] rounded-[50px] p-[2px]"
                        style={{
                            background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                        }}
                    >
                        <Input
                            type="text"
                            className="size-full rounded-full border-none bg-[#101030] pl-[20px] pr-[70px] text-5xl placeholder:font-semibold placeholder:text-[#353652]"
                            placeholder="Поиск"
                        />
                        <Button
                            variant="header_desktop_btn_gradient"
                            className="absolute right-0 top-1/2 flex size-[60px] -translate-y-1/2 items-center justify-center rounded-full"
                        >
                            <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                        </Button>
                    </div>
                    <div>
                        <button
                            onClick={handleSelectToggle}
                            className="mt-4 flex h-[64px] w-full items-center justify-between rounded-full border-none bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 px-6 text-lg font-semibold text-white outline-none focus:outline-none focus:ring-2"
                        >
                            Отрасль профессии
                            <ChevronDown
                                className={`size-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isOpen && (
                            <div>
                                <Tabs>
                                    <TabsList>
                                        <TabsTrigger value="tab1">IT-отрасль</TabsTrigger>
                                        <TabsTrigger value="tab2">Здравоохранение</TabsTrigger>
                                        <TabsTrigger value="tab3">Искусство</TabsTrigger>
                                        <TabsTrigger value="tab4">Спорт</TabsTrigger>
                                        <TabsTrigger value="tab5">Отрасль 5</TabsTrigger>
                                        <TabsTrigger value="tab6">Отрасль 6</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="tab1">
                                        <p>IT-отрасль</p>
                                    </TabsContent>
                                    <TabsContent value="tab2">
                                        <p>Здравоохранение</p>
                                    </TabsContent>
                                    <TabsContent value="tab3">
                                        <p>Искусство</p>
                                    </TabsContent>
                                    <TabsContent value="tab4">
                                        <p>Спорт</p>
                                    </TabsContent>
                                    <TabsContent value="tab5">
                                        <p>Отрасль 5</p>
                                    </TabsContent>
                                    <TabsContent value="tab6">
                                        <p>Отрасль 6</p>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfessionsPageDesktop
