import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/favicon.ico') ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next()
    }
    if (pathname.startsWith('/mobi') || pathname.startsWith('/desktop')) {
        return NextResponse.next()
    }
    const ua = request.headers.get('user-agent') || ''
    const isMobile = /Mobile|Android|iP(hone|od|ad)/i.test(ua)
    const url = request.nextUrl.clone()

    if (isMobile) {
        url.pathname = `/mobi${pathname}`
    } else {
        url.pathname = `/desktop${pathname}`
    }

    return NextResponse.rewrite(url)
}
