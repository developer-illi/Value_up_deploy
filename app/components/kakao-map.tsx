import { Map, MapMarker } from 'react-kakao-maps-sdk'

import LogoSingle from '~/assets/logo-single.svg'

type KakaoMapProps = {
  lat: number
  lng: number
}

export function KakaoMap({ lat, lng }: KakaoMapProps) {
  return (
    <Map center={{ lat, lng }} style={{ width: '100%', height: '100%' }}>
      <MapMarker
        position={{ lat, lng }}
        image={{
          src: LogoSingle,
          size: { width: 40, height: 40 },
          options: {
            offset: { x: 20, y: 40 },
          },
        }}
      />
    </Map>
  )
}
