'use client'

import { Suspense, lazy, useEffect, useRef } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Disconnect the viewport observer on unmount.
  useEffect(() => () => observerRef.current?.disconnect(), [])

  // Freeze the WebGL render loop while the hero is scrolled out of view.
  // The robot only reacts to the cursor over the hero, so there is nothing to
  // see once it leaves the viewport — stop() halts rendering, controls and
  // events; play() resumes the moment it scrolls back in.
  const handleLoad = (app: Application) => {
    const canvas = app.canvas
    if (!canvas) return

    observerRef.current?.disconnect()
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (app.isStopped) app.play()
        } else if (!app.isStopped) {
          app.stop()
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)
    observerRef.current = io
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={handleLoad}
      />
    </Suspense>
  )
}
