"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
        key={item.href}
        size="lg"
        onClick={() => onClick(item.href)}
        className={cn(
        "w-full font-normal justify-start pl-4 mb-1 pt-1 text-neutral-700",
        pathname === item.href && "bg-sky-500/10 text-sky-700"
        )}
        variant="ghost"
    >
        {item.title}
    </Button>
      ))}
    </nav>
    
  )
}