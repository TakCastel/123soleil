import { ImageResponse } from 'next/og';

export const alt = "1, 2, 3 Soleil – Association de cinéma solidaire à Avignon";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F9D849',
          backgroundImage:
            'radial-gradient(circle, #ffffff 3px, transparent 3px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 72px',
            border: '6px solid #000000',
            backgroundColor: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 700,
              color: '#D6342A',
              letterSpacing: -2,
            }}
          >
            1,2,3 SOLEIL !
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 700,
              color: '#333333',
              marginTop: 16,
              textAlign: 'center',
            }}
          >
            Association de cinéma solidaire et inclusif à Avignon
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
