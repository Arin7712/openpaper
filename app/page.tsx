"use client"

import { ModeToggle } from "@/components/mode-toggle"
import SearchBar from "@/components/searchbar"

const Home = () => {

  return (
    <main className="flex justify-center  min-h-screen w-full">
      <div className="flex flex-col gap-4 w-full">
      <ModeToggle/>
        <SearchBar/>
      </div>
    </main>
  )
}

export default Home
