"use client";

import { Button, buttonVariants } from './ui/button'
import { navItems } from '@/lib/constants'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle';
import { UserButton, useUser } from '@clerk/nextjs';
import { useState } from 'react';

const Navbar = () => {
  const {isSignedIn} = useUser();

  return (
    <nav className='flex items-center justify-between w-full py-2 md:px-[6rem] border-b'>
      {/* Logo */}
      <Link href="/">
      <h3>OpenPaper</h3>
      </Link>

      {/* Nav Links */}
      <div className='md:flex hidden items-center gap-6'>
        {
          navItems.map((item, index) => (
            <Link key={index} href={item.href}>{item.title}</Link>
          ))
        }

      </div>

      {/* Authenticate */}
      <div className='flex items-center gap-6'>
        <ModeToggle/>
        {/* <Link href="/upload" className={buttonVariants({ variant: "outline" })}>Upload</Link> */}
        {
          isSignedIn ? <UserButton/>:<Link href="/sign-in" className={`${buttonVariants()}`}>Sign in</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar
