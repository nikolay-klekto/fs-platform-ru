import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const pathname = url.pathname

    const photoPath = pathname.split('/api/photo/')[1]
    
    if (!photoPath) {
      return NextResponse.json(
        { error: 'Photo path not specified' },
        { status: 400 }
      )
    }

    const fullPath = path.join(process.cwd(), 'uploads', photoPath)

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Photo not found' },
        { status: 404 }
      )
    }

    const extension = path.extname(fullPath).toLowerCase()
    const contentType = 
      extension === '.webp' ? 'image/webp' :
      extension === '.png' ? 'image/png' :
      'application/octet-stream'

    const fileBuffer = fs.readFileSync(fullPath)
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      },
    })

  } catch (error) {
    console.error('Error serving photo:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}