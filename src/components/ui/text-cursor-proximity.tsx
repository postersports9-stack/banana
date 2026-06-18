"use client"

import React, { CSSProperties, forwardRef, useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react"
import { useMousePositionRef } from "@/hooks/use-mouse-position-ref"

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
  containerRef,
  mousePositionRef,
  radius,
  falloff,
}: {
  letter: string
  styles: TextProps["styles"]
  containerRef: React.RefObject<HTMLElement | null>
  mousePositionRef: React.MutableRefObject<{ x: number; y: number }>
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

  useAnimationFrame(() => {
    if (!containerRef.current || !letterRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const rect = letterRef.current.getBoundingClientRect()
    
    const letterCenterX = rect.left + rect.width / 2 - containerRect.left
    const letterCenterY = rect.top + rect.height / 2 - containerRect.top

    const distance = calculateDistance(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
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
                containerRef={containerRef}
                mousePositionRef={mousePositionRef}
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
