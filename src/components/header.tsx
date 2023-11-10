import Link from "next/link";
import { Brand, Logo } from "./icons";
import { Gamepad2, Home, LayoutDashboard, Menu } from "lucide-react";
import { Saira } from "next/font/google";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";

const saira = Saira({ subsets: ["latin"] });

export default function Header({ className }: { className?: string }) {
  const menuConfig = [
    {
      href: "/",
      icon: <Home className="w-4 h-4" />,
      title: "Home",
    },
    {
      href: "/playground",
      icon: <Gamepad2 className="w-4 h-4" />,
      title: "Playground",
    },
    {
      href: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
      title: "Dashboard",
    },
  ];

  return (
    <header
      className={cn(
        "flex flex-row justify-between items-center p-2 border-b border-border",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <a href={"https://albertoharka.it/"} target="_blank">
          <Brand className="w-12 h-12 fill-foreground" />
        </a>
        <Link
          href={"/"}
          className="cursor-pointer active:shadow-inner active:scale-95"
        >
          <div className="h-12 p-2 border border-border rounded">
            <Logo>
              <p
                className={cn(
                  saira.className,
                  "text-lg select-none tracking-tight",
                )}
              >
                panoptico
              </p>
            </Logo>
          </div>
        </Link>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex flex-row gap-2">
          <MenuItem href="/" icon={<Home className="w-5 h-5" />}>
            Home
          </MenuItem>
          <MenuItem href="/playground" icon={<Gamepad2 className="w-5 h-5" />}>
            Playground
          </MenuItem>
          <MenuItem
            href="/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
          >
            Dashboard
          </MenuItem>
        </ul>
      </nav>
      <nav className="block sm:hidden">
        <MobileMenu
          icon={<Menu className="w-5 h-5" />}
          config={menuConfig}
        ></MobileMenu>
      </nav>
    </header>
  );
}

function MenuItem({
  children,
  icon,
  href,
}: {
  children?: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <li
        className={cn(
          "flex flex-row items-center p-2 gap-1 rounded active:shadow-inner active:scale-95",
          // currentUrl == href && "border-muted-foreground"
        )}
      >
        <div>{icon}</div>
        {children && <p>{children}</p>}
      </li>
    </Link>
  );
}
