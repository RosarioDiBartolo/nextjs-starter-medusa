import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { file: string } }) {
  const { file }  = await params
  if (!file) {
    return NextResponse.json({ error: 'File name is required' }, { status: 400 })
  }

  try {
    const fileUrl = `http://localhost:9000/static/${file}` // Ensure Medusa is serving files here
    const response = await fetch(fileUrl)

    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Stream the response directly to avoid buffering large files
    const readableStream = response.body
    const headers = new Headers({
      'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      'Content-Disposition': `inline; filename="${file}"`,
      'Access-Control-Allow-Origin': '*', // Allow CORS for frontend requests
    })

    return new NextResponse(readableStream, { headers })
  } catch (error) {
    console.error('Error fetching file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
