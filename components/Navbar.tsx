import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { DarkModeToggle } from './ThemeToggle';
import { Menu } from 'lucide-react';
import { IconModeToggle } from './IconThemeToggle';

const Navbar = () => {

  const navLinks = [
    {
      label: "idk",
      link: "#"
    },
    {
      label: "what",
      link: "#"
    },
    {
      label: "i'll",
      link: "#"
    },
    {
      label: "put",
      link: "#"
    }
  ];

  return (
        <nav className="sticky top-0 flex items-center justify-between h-16 max-w-screen py-6 px-8 border-b-2 border-x-[100%] bg-background/30 backdrop-blur-md">
          
          <h1 className="text-3xl">Heyyo</h1>

          {/* Desktop Navigation */}
          <ul className="pl-8 list-none md:flex hidden items-center flex-1 space-x-8">
            {navLinks.map((nav, index) => (
              <li
                key={index}
                className=""
              >
                <Link href={`${nav.link}`}>{nav.label}</Link>
              </li>
            ))}
          </ul>

          
          

          
          {/* Account */}
          <div className="flex space-x-6 align-middle">
            <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
            <Link href="/register"><Button>Register</Button></Link>
            <div className="grid w-full content-center">
              <IconModeToggle />
            </div>
          </div>
          
          



        </nav>
  )
}

export default Navbar