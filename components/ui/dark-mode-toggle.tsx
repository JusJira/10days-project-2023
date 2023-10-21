"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./button"

export function ModeToggle() {
  const { setTheme } = useTheme()
 
  
  

  return (<>
    <Button variant = 'ghost' size = 'icon' className="background transition-all duration-1000 block dark:hidden " onClick = {()=> {setTheme('dark')}}>
    <Sun className="h-10 w-10 rotate-0  dark:-rotate-90 " />
    </Button>
    <Button variant = 'ghost' size = 'icon' className="background transition-all duration-1000 hidden dark:block " onClick = {()=> {setTheme('light')}}>
    <Moon className="h-10 w-10 rotate-90  dark:rotate-0  " />
    </Button>
    </>
  )
}