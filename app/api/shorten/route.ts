import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid URL' }, { status: 400 })
    }

    const upstream = await fetch('https://api.encurtador.dev/encurtamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })

    const data = await upstream.json()

    return NextResponse.json(data, { status: upstream.status })
  } catch (err) {
    console.error('[/api/shorten]', err)
    return NextResponse.json({ message: 'Failed to reach shortening service' }, { status: 502 })
  }
}
