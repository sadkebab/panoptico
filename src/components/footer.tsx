import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex flex-row justify-between border-t border-muted text-muted-foreground p-2",
        className,
      )}
    >
      <p>
        ©
        <a href="https://albertoharka.it/" target="_blank">
          Alberto Harka
        </a>
        2023
      </p>
    </footer>
  );
}
