const API_ENDPOINT = '/api/shorten'

interface RawShortenResponse {
      url: string
}

export interface ShortenResponse {
  shortUrl: string
  originalUrl: string
  createdAt: string
}

export async function shortenUrl(url: string): Promise<ShortenResponse> {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || `Error ${res.status}: ${res.statusText}`)
  }

  const data: RawShortenResponse[] = await res.json()
  console.log('Shorten API response:', data)

  return {
    shortUrl: data[0].url,
    originalUrl: url,
    createdAt: new Date().toISOString(),
  }
}
