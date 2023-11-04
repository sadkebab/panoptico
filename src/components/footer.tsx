import Link from "next/link";

export default function Footer(){
  return (
    <footer className="flex flex-row justify-between border-t border-muted text-muted-foreground p-2">
      <p>
        © <a href="https://albertoharka.it/" target="_blank">Alberto Harka</a> 2023
      </p>
    </footer>
  )
} 