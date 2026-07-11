"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const {theme,setTheme } = useTheme()
    
  return (
    <Button 
      
      size="icon" 
     
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0  dark:scale-0 transaition-all dark:-rotate-90" />
    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:text-white dark:scale-100 dark:rotate-0" />
      
    <span className="sr-only">Toggle theme</span>
    </Button>
    
  )
}
