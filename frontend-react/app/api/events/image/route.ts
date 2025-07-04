import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('eventId')

    if (!eventId) {
        return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'uploads/events', `${eventId}.webp`)
    let fileBuffer: Buffer
    let contentType: string

    if (fs.existsSync(filePath)) {
        fileBuffer = fs.readFileSync(filePath)
        contentType = 'image/webp'
    } else {
        const fallbackPath = path.join(process.cwd(), 'public/images/events_1.png')
        fileBuffer = fs.readFileSync(fallbackPath)
        contentType = 'image/png'
    }

    return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
            'Content-Type': contentType,
        },
    })
}
