"use client"

import { Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { setCookie } from "cookies-next"

export interface HeaderProps {
    defaultTheme: string
}

export function Header({ defaultTheme }: HeaderProps) {
    const [theme, setTheme] = useState<string>(defaultTheme)

    const toggleTheme = () => {
        const htmlElement = document.documentElement
        const currentTheme = htmlElement.className
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        htmlElement.className = newTheme
        setTheme(newTheme)
        setCookie('theme', newTheme)
      }

    return (
        <header className="w-full fixed backdrop-blur-3xl h-[72px] z-30 flex items-center">
            <div className="max-w-[1120px] w-full mx-auto flex items-center justify-between">
            <Image className="rounded-full" src="/logo.png" alt="Game Read logo" width={48} height={48} />

                <button className="group/theme hover:cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-transparent hover:bg-foreground transition duration-500" onClick={toggleTheme} aria-label="Toggle application theme">
                    {theme === 'dark' ? (
                        <Moon className="group-hover/theme:text-background  transition duration-500" />
                    ): (
                        <Sun className="group-hover/theme:text-background  transition duration-500" />
                    )}
                </button>
            </div>
        </header>
    )
}