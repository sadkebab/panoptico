import Link from "next/link";
import { Brand, Logo } from "./icons";
import { Gamepad2, Home, LayoutDashboard, Menu } from "lucide-react";
import { Saira } from "next/font/google";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";

const saira = Saira({ subsets: ['latin'] })

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-2 border-b border-muted">
      <div className="flex flex-row items-center gap-2">
        <a href={"https://albertoharka.it/"} target="_blank">
          <Brand className="w-12 h-12 fill-foreground" />
        </a>
        <div className="h-12 p-2 border-muted bg-muted rounded">
          <Logo>
            <p className={cn(saira.className, "text-lg cursor-default select-none tracking-tight")}>panoptico</p>
          </Logo>
        </div>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex flex-row gap-2">
          <MenuItem href="/" icon={<Home className="w-5 h-5" />} >
            Home
          </MenuItem>
          <MenuItem href="/playground" icon={<Gamepad2 className="w-5 h-5" />} >
            Playground
          </MenuItem>
          <MenuItem href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} >
            Dashboard
          </MenuItem>
        </ul>
      </nav>
      <nav className="block sm:hidden">
        <MobileMenu icon={
          <div className="bg-muted h-12 w-12 flex flex-row items-center justify-center p-2 gap-1 rounded active:shadow-inner active:scale-95">
            <Menu className="w-5 h-5" />
          </div>
        }>
          <MenuItem href="/" icon={<Home className="w-4 h-4" />} >
            Home
          </MenuItem>
          <MenuItem href="/playground" icon={<Gamepad2 className="w-4 h-4" />} >
            Playground
          </MenuItem>
          <MenuItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} >
            Dashboard
          </MenuItem>
        </MobileMenu>
      </nav>

    </header>
  )
}


function MenuItem({
  children,
  icon,
  href
}: {
  children?: React.ReactNode
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link href={href}>
      <li className="bg-muted flex flex-row items-center p-2 gap-1 rounded active:shadow-inner active:scale-95">
        <div>{icon}</div>
        {children && <p>{children}</p>}
      </li>
    </Link>
  )
}


