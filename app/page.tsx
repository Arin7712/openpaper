
import { ModeToggle } from "@/components/mode-toggle"
import SearchBar from "@/components/searchbar"
import { fetchPapers } from "@/lib/db/paper";

const Home = async() => {
  const papers = await fetchPapers();

  return (
    <main className="flex justify-center  min-h-screen w-full">
      <div className="flex flex-col gap-4 w-full">
      <ModeToggle/>
        <SearchBar papers={papers}/>
      </div>
    </main>
  )
}

export default Home
