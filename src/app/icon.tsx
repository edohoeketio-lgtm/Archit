import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#E5D223',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          color: '#0A3B24',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 160, fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.05em' }}>
          THE
        </div>
        <div style={{ fontSize: 160, fontWeight: 800, lineHeight: 0.85, letterSpacing: '-0.05em' }}>
          YARD
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
