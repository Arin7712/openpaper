"use client";
import React from 'react'
import { usePathname } from 'next/navigation';

const Page = () => {
    const id = usePathname()
  return (
    <div>
      Paper ID {id.split("/")[2]}
    </div>
  )
}

export default Page
