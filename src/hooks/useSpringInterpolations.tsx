import { to } from 'react-spring'
import type { Spring } from './useSpring'
import { clamp } from '../utils'

export function useSpringInterpolations({
  spring,
}: {
  spring: Spring
}): React.CSSProperties {
  const interpolateBorderRadius = to(
    [spring.y, spring.maxHeight],
    (y, maxHeight) => {
      return `${Math.round(clamp(maxHeight - y, 0, 16))}px`
    },
  )

  const interpolateHeight = to(
    [spring.y, spring.minSnap, spring.maxSnap],
    (y, minSnap, maxSnap) => `${Math.round(clamp(y, minSnap, maxSnap))}px`,
  )

  const finalHeight = `${Math.round(spring.maxSnap.get())}px`

  const interpolateY = to(
    [spring.y, spring.minSnap, spring.maxSnap],
    (y, minSnap, maxSnap) => {
      if (y < minSnap) {
        return `${Math.round(minSnap - y)}px`
      }
      if (y > maxSnap) {
        return `${Math.round(maxSnap - y)}px`
      }
      return '0px'
    },
  )

  const interpolateFiller = to([spring.y, spring.maxSnap], (y, maxSnap) => {
    if (y >= maxSnap) {
      return Math.ceil(y - maxSnap)
    }
    return 0
  })

  const interpolateContentOpacity = to(
    [spring.y, spring.minSnap],
    (y, minSnap) => {
      if (!minSnap) {
        return 0
      }
      const minX = Math.max(minSnap / 2 - 45, 0)
      const maxX = Math.min(minSnap / 2 + 45, minSnap)
      const minY = 0
      const maxY = 1

      const slope = (maxY - minY) / (maxX - minX)
      const res = (y - minX) * (slope + minY)
      return clamp(res, 0, 1)
    },
  )

  const interpolateBackdrop = to([spring.y, spring.minSnap], (y, minSnap) =>
    minSnap ? clamp(y / minSnap, 0, 1) : 0,
  )

  return {
    ['--rsbs-content-opacity' as any]: interpolateContentOpacity,
    ['--rsbs-backdrop-opacity' as any]: interpolateBackdrop,
    ['--rsbs-antigap-scale-y' as any]: interpolateFiller,
    ['--rsbs-overlay-translate-y' as any]: interpolateY,
    ['--rsbs-overlay-rounded' as any]: interpolateBorderRadius,
    ['--rsbs-overlay-h' as any]: interpolateHeight,
    ['--fag-height' as any]: finalHeight,
  }
}
