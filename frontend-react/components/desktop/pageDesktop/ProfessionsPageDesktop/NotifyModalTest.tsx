'use client'

import React, { useState } from 'react'
import NotifyModalDesktop from '@/components/desktop/layout/ProfessionModalDesktop/NotifyModalDesktop'
import { Button } from '@/components/ui/button'

const NotifyModalTest: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-4">Тест NotifyModalDesktop</h1>
            <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsOpen(true)}
            >
                Открыть модальное окно
            </Button>

            <NotifyModalDesktop isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}

export default NotifyModalTest
