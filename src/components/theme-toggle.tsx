"use client"

import { cn, getCookie, setCookie } from "@/lib/utils"
import { ReactNode, useEffect, useState } from "react"
import { iconForTheme } from "./icons"

export default function ThemeToogle({ defaultIcon }: { defaultIcon: ReactNode }) {
  const [icon, setIcon] = useState(defaultIcon)
  const toggle = () => {
    const theme = getCookie('theme')

    if (theme) {
      const newTheme = theme === "dark" ? "light" : "dark"
      setCookie('theme', newTheme, 365)

      const html = document.querySelector("html")
      html?.classList.remove(theme)
      html?.classList.add(newTheme)
      setIcon(iconForTheme(newTheme))
    }
  }

  useEffect(() => {
    const theme = getCookie('theme')

    if (!theme) {
      const newTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
      setCookie('theme', newTheme, 365)

      document.querySelector("html")?.classList.add(newTheme)
      setIcon(iconForTheme(newTheme))
    }
  }, [])

  return <div className={cn(
    "fixed bottom-3 right-3 flex flex-row items-center justify-center shadow-md",
    "p-2 rounded-full bg-muted",
    "active:shadow-inner active:scale-95"
  )}>
    <button className="w-6 h-6" onClick={() => toggle()}>
      {icon}
    </button>
  </div>
}

