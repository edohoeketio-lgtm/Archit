import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'The Yard Studio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#E5D223',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#0A3B24',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '64px',
            border: '8px solid #0A3B24',
            width: '600px',
            height: '600px',
          }}
        >
          <div style={{ fontSize: 220, fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.05em' }}>
            the
          </div>
          <div style={{ fontSize: 220, fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.05em' }}>
            yard
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
