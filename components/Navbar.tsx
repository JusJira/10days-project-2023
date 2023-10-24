import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { DarkModeToggle } from './ThemeToggle';
import { Menu } from 'lucide-react';
import { IconModeToggle } from './IconThemeToggle';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = () => {
  const { getUser } = getKindeServerSession();
  const user = getUser()

  const navLinks = [
    {
      label: "Cart",
      link: "#"
    },
    {
      label: "Something",
      link: "#"
    },
  ];

  return (
        <nav className="sticky top-0 items-center justify-between h-16 max-w-screen py-6 px-8 border-b-2 border-x-[100%] bg-background/30 backdrop-blur-md hidden md:flex">
          
          <h1 className="text-3xl">Chad Mart</h1>

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
            {
              (!user) ? 
              <>
                <Link href="/login"><Button variant="ghost">Sign In</Button></Link>
                <Link href="/register"><Button>Register</Button></Link>
              </> :
              <>
              <Link href="/account">
                <Avatar>
                  <AvatarImage src="https://nhadepso.com/wp-content/uploads/2023/03/cap-nhat-99-hinh-anh-avatar-gau-cute-de-thuong-ngo-nghinh_1.jpg" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
                
              </>
            }


            <div className="grid w-full content-center">
              <IconModeToggle />
            </div>
          </div>
          
          



        </nav>
  )
}

export default Navbar