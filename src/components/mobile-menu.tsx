"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/lib/ui/menu-bar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function MobileMenu({
  config,
  icon,
}: {
  config: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  icon: React.ReactNode;
}) {
  return (
    // <Popover>
    //   <PopoverTrigger asChild>{icon}</PopoverTrigger>
    //   <PopoverContent className="w-fit p-1 flex flex-col gap-1 border-muted">
    //     {children}
    //   </PopoverContent>
    // </Popover>
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{icon}</MenubarTrigger>
        <MenubarContent>
          {config.map(({href, title, icon}, i) => (
            <Link href={href}>
              <MenubarItem key={i}>
                  <div className="flex flex-row gap-2 p-2">
                  <div>{icon}</div>
                  {title && <p>{title}</p>}
                  </div>
              </MenubarItem>
            </Link>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
