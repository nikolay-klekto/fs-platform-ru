import { NextRequest } from 'next/server'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } }
) {
  const segments = context.params.path
  const fullPath = join(process.cwd(), 'uploads', ...segments)
 
  if (!existsSync(fullPath)) {
     return new Response('Not found', { status: 404 })
  }

  const fileBuffer = readFileSync(fullPath)
  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
    },
  })
}
