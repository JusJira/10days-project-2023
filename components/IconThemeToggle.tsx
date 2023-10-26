"use client"
 
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from 'react'
import { Button } from "./ui/button"


export function IconModeToggle() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }

  return (<>
    <Button variant = 'ghost' size = 'icon' className="background transition-all duration-300 grid dark:hidden" onClick = {()=> {setTheme('dark')}}>
    <Sun className="h-6 w-6 rotate-0  dark:-rotate-90 " />
    </Button>
    <Button variant = 'ghost' size = 'icon' className="background transition-all duration-300 hidden dark:grid " onClick = {()=> {setTheme('light')}}>
    <Moon className="h-6 w-6 rotate-90  dark:rotate-0  " />
    </Button>
    </>
  )
}