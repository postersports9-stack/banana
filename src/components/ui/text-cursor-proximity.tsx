"use client"

import React, { CSSProperties, forwardRef, useCallback, useEffect, useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

// Shared per-frame state: whether the effect should run this frame, and the
// container rect (read once per frame for all letters instead of once per
// letter). Returned by the getFrameState callback below.
type FrameState = {
  active: boolean
  // True when this frame is throttled out — letters hold their current value
  // rather than recomputing or resetting.
  skip: boolean
  containerRect: DOMRect | null
  mouseX: number
  mouseY: number
}

// Recompute the proximity effect at ~30fps instead of every frame. Halves the
// layout reads while active; visually indistinguishable for this effect.
const FRAME_INTERVAL_MS = 32

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  containerRef: React.RefObject<HTMLElement | null>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian"
}

const Letter = ({
  letter,
  styles,
  getFrameState,
  radius,
  falloff,
}: {
  letter: string
  styles: TextProps["styles"]
  getFrameState: (time: number) => FrameState
  radius: number
  falloff: string
}) => {
  const letterRef = useRef<HTMLSpanElement>(null)
  const proximity = useMotionValue(0)

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  const calculateFalloff = (distance: number): number => {
    const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1)
    switch (falloff) {
      case "exponential":
        return Math.pow(normalizedDistance, 2)
      case "gaussian":
        return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2)
      case "linear":
      default:
        return normalizedDistance
    }
  }

  useAnimationFrame((time) => {
    if (!letterRef.current) return

    // Shared per-frame gate: skips the layout reads below entirely when the
    // hero is off-screen or the cursor is outside it. In those cases every
    // letter rests at proximity 0 (identical to the previous behaviour), so
    // there is nothing to compute.
    const frame = getFrameState(time)
    if (frame.skip) return
    if (!frame.active || !frame.containerRect) {
      if (proximity.get() !== 0) proximity.set(0)
      return
    }

    const containerRect = frame.containerRect
    const rect = letterRef.current.getBoundingClientRect()

    const letterCenterX = rect.left + rect.width / 2 - containerRect.left
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top

    const distance = calculateDistance(
      frame.mouseX,
      frame.mouseY,
      letterCenterX,
      letterCenterY
    )

    proximity.set(calculateFalloff(distance))
  })

  // We map over the known stable keys of the styles prop
  const styleKeys = Object.keys(styles || {}) as Array<keyof typeof styles>
  const transformedStyles: Record<string, any> = {}

  styleKeys.forEach((key) => {
    const val = styles[key]
    if (val) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      transformedStyles[key as string] = useTransform(proximity, [0, 1], [val.from, val.to])
    }
  })

  return (
    <motion.span
      ref={letterRef}
      className="inline-block"
      aria-hidden="true"
      style={transformedStyles}
    >
      {letter}
    </motion.span>
  )
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    // @ts-ignore
    const mousePositionRef = useMousePositionRef(containerRef)
    const words = label.split(" ")

    // Is the hero in the viewport? Updated by IntersectionObserver, not polled.
    const inViewRef = useRef(true)
    useEffect(() => {
      const el = containerRef.current
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          inViewRef.current = entry.isIntersecting
        },
        { threshold: 0 }
      )
      io.observe(el)
      return () => io.disconnect()
    }, [containerRef])

    // Compute the shared frame state at most once per animation frame. Every
    // letter calls this with motion's frame timestamp; the result is cached by
    // timestamp so the container rect is read once per frame, not once per
    // letter. `active` is false (and no layout is read) when the hero is
    // off-screen or the cursor is outside it plus a `radius` margin.
    const frameCache = useRef<{ time: number; lastComputed: number; state: FrameState }>({
      time: -1,
      lastComputed: -Infinity,
      state: { active: false, skip: false, containerRect: null, mouseX: 0, mouseY: 0 },
    })
    const getFrameState = useCallback(
      (time: number): FrameState => {
        const cache = frameCache.current
        if (time === cache.time) return cache.state
        cache.time = time
        const state = cache.state

        // Throttle to ~30fps: on skipped frames letters hold their value.
        if (time - cache.lastComputed < FRAME_INTERVAL_MS) {
          state.skip = true
          return state
        }
        cache.lastComputed = time
        state.skip = false

        const el = containerRef.current
        if (!inViewRef.current || !el) {
          state.active = false
          state.containerRect = null
          return state
        }

        const rect = el.getBoundingClientRect()
        const { x, y } = mousePositionRef.current
        const margin = radius
        state.active =
          x >= -margin &&
          y >= -margin &&
          x <= rect.width + margin &&
          y <= rect.height + margin
        state.containerRect = rect
        state.mouseX = x
        state.mouseY = y
        return state
      },
      [containerRef, mousePositionRef, radius]
    )

    return (
      <span
        ref={ref}
        className={`${className} inline`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, letterIndex) => (
              <Letter
                key={letterIndex}
                letter={letter}
                styles={styles}
                getFrameState={getFrameState}
                radius={radius}
                falloff={falloff}
              />
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)

TextCursorProximity.displayName = "TextCursorProximity"
export default TextCursorProximity
