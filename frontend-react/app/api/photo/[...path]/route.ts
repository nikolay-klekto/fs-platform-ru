import { NextRequest } from 'next/server'
import { join } from 'path'
import { existsSync, readFileSync } from 'fs'

type ContextWithParams = {
  params: {
    path: string[]
  }
  [key: string]: unknown 
}

export async function GET(
  req: NextRequest,
  context: ContextWithParams
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
