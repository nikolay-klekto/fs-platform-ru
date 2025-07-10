import fs from 'fs'
import path from 'path'

export function getEventImage(eventId: string): Buffer | null {
    const filePath = path.join(process.cwd(), 'uploads/events', `${eventId}.webp`)
    if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath)
    }
    return null
}
