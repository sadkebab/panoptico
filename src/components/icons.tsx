import { Moon, Sun, SunMoon } from "lucide-react"
import { ReactNode } from "react"

export function iconForTheme(theme: string | undefined) {
  if (!theme) return <SunMoon />
  return theme === "dark" ? <Moon /> : <Sun />
}

interface LogoProps {
  color?: string
  size?: number
  className?: string
  style?: React.CSSProperties
}
export const Brand: React.FC<LogoProps> = ({ color, className, size, style }) => {
  return (
    <svg id="eNBs4bAWqO91" xmlns="http://www.w3.org/2000/svg" className={className} stroke={color} fill={color} width={size} height={size} style={style} viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      <g transform="matrix(2.857201 0 0 2.857202 0.968396 0.954055)">
        <path d="M9.44,54.86v-21.7c0-2.42,1.96-4.38,4.38-4.38h28.78c2.42,0,4.38-1.96,4.38-4.38v-20.02C46.98,1.96,45.02,0,42.6,0L4.38,0C1.96,0,0,1.96,0,4.38v95.56c0,2.42,1.96,4.38,4.38,4.38h.67c2.42,0,4.38-1.96,4.38-4.38v-45.08Z" />
        <rect width="25.86" height="14.39" rx="4.38" ry="4.38" transform="translate(21.14 40.47)" />
        <path d="M58.68,40.47v28.89c0,2.42,1.96,4.38,4.38,4.38h16.41c2.42,0,4.38-1.96,4.38-4.38v-64.98C83.85,1.96,81.89,0,79.47,0h-16.41c-2.42,0-4.38,1.96-4.38,4.38v36.09Z" />
        <path d="M46.99,73.75v-2.81c0-2.42-1.96-4.38-4.38-4.38h-17.09c-2.42,0-4.38,1.96-4.38,4.38v29c0,2.42,1.96,4.38,4.38,4.38h17.09c2.42,0,4.38-1.96,4.38-4.38v-26.19Z" />
        <path d="M99.94,0c-2.42,0-4.38,1.96-4.38,4.38v95.56c0,2.42,1.96,4.38,4.38,4.38v0c2.42,0,4.38-1.96,4.38-4.38v-95.56c0-2.42-1.96-4.38-4.38-4.38v0Z" />
        <rect width="25.18" height="18.89" rx="4.38" ry="4.38" transform="translate(58.68 85.44)" />
      </g>
    </svg>
  )
}

export const Logo = ({ children }: { children: ReactNode }) => {
  return <section className="logo-wrapper">
    <div className="logo-top">{children}</div>
    <div className="logo-bottom" aria-hidden="true">{children}</div>
  </section>
}