import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { IconModeToggle } from './IconThemeToggle';
import { getKindeServerSession ,RegisterLink, LoginLink} from '@kinde-oss/kinde-auth-nextjs/server';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { db } from '@/lib/db';
import initials from 'initials';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser()

  const userData = await db.user.findUnique({
    where: {
      id: user?.id||""
    }
  })


  const navLinks = [
    {
      label: "Home",
      link: "/"
    },
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
          
          <h1 className="text-3xl">ChadMart</h1>

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
                <LoginLink><Button variant="ghost">Sign In</Button></LoginLink>
                <RegisterLink><Button>Register</Button></RegisterLink>
              </> :
              <>
              <Link href="/account" >
                <Avatar>
                  <AvatarImage className='object-cover object-center' src={userData?.image || "https://res.cloudinary.com/dqervfik7/image/upload/v1698202449/10-day-project/image/users/n5o6jwbsitgdvsuxrhfa.png"} />
                  <AvatarFallback>{initials(userData?.displayName as string)}</AvatarFallback>
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