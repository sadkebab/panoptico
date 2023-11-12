"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MenuItem({
  children,
  icon,
  href,
}: {
  children?: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  return (
    <Link href={href}>
      <li
        className={cn(
          "flex flex-row items-center p-2 gap-1 rounded text-muted-foreground",
          pathname == href && "text-black",
        )}
      >
        <div>{icon}</div>
        {children && <p>{children}</p>}
      </li>
    </Link>
  );
}
