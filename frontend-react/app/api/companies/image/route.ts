import { NextRequest, NextResponse } from 'next/server'
import { serveImage } from '@/lib/serveImage'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const companyId = searchParams.get('companyId')
        const type = searchParams.get('type')

        if (!companyId || !type) {
            return NextResponse.json({ error: 'Missing companyId or type' }, { status: 400 })
        }

        const folder = `companies/${type}`
        const file = `${companyId}.webp`
        const fallbackPath = `public/images/companies_default_${type}.png`

        return await serveImage({
            folder,
            file,
            fallbackPath,
            contentType: 'image/webp',
            fallbackContentType: 'image/png',
        })
    } catch (error) {
        console.error('Error serving company image:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
