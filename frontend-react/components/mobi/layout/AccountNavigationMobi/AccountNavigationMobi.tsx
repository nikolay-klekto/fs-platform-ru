'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import Modal from '@/components/ui/modal'
import { content, IAccountNavigation } from './contentAccountNavigationMobi/content'

export const AccountNavigationMobi: React.FC = () => {
    const router = useRouter()
    const pathname = usePathname()

    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedLabel, setSelectedLabel] = useState('')

    useEffect(() => {
        const match = content.find((item) => item.href === pathname)
        if (match) {
            setSelectedLabel(match.label)
        }
    }, [pathname])

    const handleSelectOption = (item: IAccountNavigation) => {
        setSelectedLabel(item.label)
        setMenuOpen(false)
        router.push(item.href)
    }

    return (
        <div className="text-text22px_mobi relative  text-[#878797]">
            <button
                className="bg-sub-title-gradient-mobi flex items-center bg-clip-text pb-[10px] text-4xl font-medium uppercase text-transparent underline decoration-[#6C41F3] decoration-1 underline-offset-4"
                onClick={() => setMenuOpen(true)}
            >
                {selectedLabel}
                <div className="-rotate-90">
                    <ChevronLeft size={30} color="#8333F3" />
                </div>
            </button>

            {menuOpen && (
                <Modal onClose={() => setMenuOpen(false)} size="small" showCloseButton={false}>
                    <div className="z-50 flex flex-col space-y-4 py-[36px] text-center">
                        {content.map((item) => {
                            const isActive = item.href === pathname

                            return (
                                <button
                                    key={item.href}
                                    onClick={() => handleSelectOption(item)}
                                    className={`text18px_mobi font-medium uppercase transition-all ${
                                        isActive
                                            ? 'bg-gradient-desktop bg-clip-text text-transparent underline decoration-[#6C41F3]'
                                            : 'text-[#878797]'
                                    }`}
                                >
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </Modal>
            )}
        </div>
    )
}
