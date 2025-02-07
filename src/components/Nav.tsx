"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Nav({ children }: { children: ReactNode }) {
    return <nav
        className="bg-primary text-primary-foreground shadow-sm flex justify-center px-4"
    >{children}</nav>
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    const pathname = usePathname()
    return <Link
        {...props}
        className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === props.href && "text-foreground bg-background",
            "p-4 hover:bg-secondary",
            "focus-visible:bg-secondary",
            "focus-visible:text-secondary-foreground",
        )}
    />
}