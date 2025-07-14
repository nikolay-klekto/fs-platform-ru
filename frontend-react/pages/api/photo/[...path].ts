// frontend-react/pages/api/photo/[...path].ts
import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const segments = req.query.path

    if (!segments || (Array.isArray(segments) && segments.length === 0)) {
      return res.status(400).json({ error: 'Photo path not specified' })
    }

    const photoPath = Array.isArray(segments) ? path.join(...segments) : segments
    const fullPath = path.join(process.cwd(), 'uploads', photoPath)

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Photo not found' })
    }

    const extension = path.extname(fullPath).toLowerCase()
    const contentType =
      extension === '.webp' ? 'image/webp' :
      extension === '.png' ? 'image/png' :
      'application/octet-stream'

    const fileBuffer = fs.readFileSync(fullPath)

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=86400') 
    return res.status(200).send(fileBuffer)

  } catch (error) {
    console.error('Error serving photo:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
