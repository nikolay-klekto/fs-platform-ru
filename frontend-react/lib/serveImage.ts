import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

type ServeImageOptions = {
    folder: string
    file: string
    fallbackPath: string
    contentType: string
    fallbackContentType: string
}

export async function serveImage({ folder, file, fallbackPath, contentType, fallbackContentType }: ServeImageOptions) {
    const filePath = path.join(process.cwd(), 'uploads', folder, file)
    let fileBuffer: Buffer
    let finalContentType: string

    try {
        fileBuffer = await fs.readFile(filePath)
        finalContentType = contentType
    } catch {
        fileBuffer = await fs.readFile(path.join(process.cwd(), fallbackPath))
        finalContentType = fallbackContentType
    }

    return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
            'Content-Type': finalContentType,
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
