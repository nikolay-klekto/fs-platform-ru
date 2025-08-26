import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const BASE_DIR = path.join(process.cwd(), 'pages', 'api', 'photo')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed' })
        }

        const segments = req.query.path
        const parts = Array.isArray(segments) ? segments : [segments]

        if (!parts.length || parts.some((p) => typeof p !== 'string' || p.includes('..'))) {
            return res.status(400).json({ error: 'Bad path' })
        }

        const photoPath = path.join(BASE_DIR, ...(parts as string[]))
        if (!fs.existsSync(photoPath)) {
            return res.status(404).json({ error: 'Photo not found' })
        }

        const ext = path.extname(photoPath).toLowerCase()
        const contentType =
            ext === '.webp'
                ? 'image/webp'
                : ext === '.png'
                  ? 'image/png'
                  : ext === 'jpg' || ext === 'jpeg'
                    ? 'image/jpeg'
                    : 'application/octet-stream'

        const fileBuffer = fs.readFileSync(photoPath)
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'public, max-age=86400')
        return res.status(200).send(fileBuffer)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}
