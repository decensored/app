import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  if (req.ip) console.log(req.ip, req.geo)
  return NextResponse.next()
}
