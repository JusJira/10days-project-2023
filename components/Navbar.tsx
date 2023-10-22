import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { ModeToggle } from './ui/dark-mode-toggle';

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
    <div className="">
        <nav className="sticky top-0 flex items-center justify-between h-16 max-w-screen p-6 px-[5vw] lg:px-[7vw] border-b-2 border-x-[100%]">
          {/* Logo */}
          <h1 className="text-3xl">Heyyo</h1>

          {/* Desktop Navigation */}
          <ul className="pl-8 list-none sm:flex hidden items-center flex-1 space-x-8">
            {navLinks.map((nav, index) => (
              <li
                key={index}
                className=""
              >
                <Link href={`${nav.link}`}>{nav.label}</Link>
              </li>
            ))}
          </ul>
          
          {/* Account Navigation */}
          <div className="flex space-x-8">
            <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
            <Link href="/register"><Button>Register</Button></Link>
            <ModeToggle />
            
          </div>
          
          



        </nav>
    </div>
  )
}

export default Navbar