import { NextRequest, NextResponse } from 'next/server'
import { serveImage } from '@/lib/serveImage'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const eventId = searchParams.get('eventId')

        if (!eventId) {
            return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
        }

        return await serveImage({
            folder: 'events',
            file: `${eventId}.webp`,
            fallbackPath: 'public/images/events_1.png',
            contentType: 'image/webp',
            fallbackContentType: 'image/png',
        })
    } catch (error) {
        console.error('Error!', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
