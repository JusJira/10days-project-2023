"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()
 
  
  

  return (<>
    <button className="bg-primary-foreground scale-100 dark:scale-0 transition-all duration-1000 block dark:hidden " onClick = {()=> {setTheme('dark')}}>
    <Sun className="h-10 w-10 rotate-0 scale-100  dark:-rotate-90 " />
    </button>
    <button className="bg-primary-foreground scale-0 dark:scale-100 transition-all duration-1000 hidden dark:block " onClick = {()=> {setTheme('light')}}>
    <Moon className="h-10 w-10 rotate-90 scale-0  dark:rotate-0 dark:scale-100 " />
    </button>
    </>
  )
}