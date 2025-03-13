import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { modals } from '@/modals/modals'
import { ModalProvider } from '@/context/ContextModal'
import '../styles/globals.css'
import ScrollRestoration from '@/lib/scroll-restoration'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'FUN SCRUT',
    description: 'Сервис для стажировки',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <ScrollRestoration />
                <ModalProvider modals={modals}>{children}</ModalProvider>
            </body>
        </html>
    )
}
