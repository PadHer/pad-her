import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import prisma from '@/lib/db'

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get('admin_session')?.value

  if (!sessionId) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  const session = await prisma.adminSession.findUnique({
    where: { id: sessionId },
  })

  if (!session || session.expiresAt < new Date()) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
