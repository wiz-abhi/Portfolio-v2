import { useEffect, useRef, useState } from "react"
import { renderToString } from "react-dom/server"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
  radius?: number
  rotationSpeed?: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({ icons, images, radius, rotationSpeed }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const rotationRef = useRef(rotation)
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  // ICON SIZE - Increased for better visibility

  const ICON_SIZE = 68 // (58 → 68)
  const ICON_RADIUS = ICON_SIZE / 2

  // CLOUD SIZE - use optional radius prop to tune visual layout
  const CLOUD_RADIUS = radius ?? 170

  // Canvas size for overall cloud - Increased
  const CANVAS_SIZE = 600 // (520 → 600)

  /* ------------------------------ LOAD ICONS ------------------------------ */
  useEffect(() => {
    if (!icons && !images) return

    const items = icons || images || []
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = ICON_SIZE
      offscreen.height = ICON_SIZE
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        if (images) {
          // URL images
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)

            // Circular crop
            offCtx.beginPath()
            offCtx.arc(ICON_RADIUS, ICON_RADIUS, ICON_RADIUS, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()

            offCtx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE)
            imagesLoadedRef.current[index] = true
          }
        } else {
          const svgString = renderToString(item as React.ReactElement)
          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(svgString)
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
            offCtx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE)
            imagesLoadedRef.current[index] = true
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [icons, images])

  /* ------------------------------ POSITIONS ------------------------------- */
  useEffect(() => {
    const items = icons || images || []
    const newIcons: Icon[] = []
    const numIcons = items.length || 20

    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * CLOUD_RADIUS,
        y: y * CLOUD_RADIUS,
        z: z * CLOUD_RADIUS,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [icons, images])

  /* ------------------------------ MOUSE EVENTS ------------------------------ */
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  /* ------------------------------ ANIMATION LOOP ------------------------------ */
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // AUTO ROTATION SPEED (adjustable via rotationSpeed prop)
      const base = 0.009
      const speed = base * (rotationSpeed ?? 1)

      if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + speed * 0.4,
          y: rotationRef.current.y + speed,
        }
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        const scale = (rotatedZ + 200) / 300
        const opacity = Math.max(0.25, Math.min(1, (rotatedZ + 150) / 200))

        ctx.save()
        ctx.translate(centerX + rotatedX, centerY + rotatedY)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(
            iconCanvasesRef.current[index],
            -ICON_RADIUS,
            -ICON_RADIUS,
            ICON_SIZE,
            ICON_SIZE
          )
        }

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [icons, images, iconPositions, isDragging])

  /* ------------------------------ RENDER CANVAS ------------------------------ */
  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-full"
      aria-label="3D Icon Cloud"
      role="img"
    />
  )
}