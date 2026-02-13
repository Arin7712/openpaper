
import { fetchPapers } from '@/lib/db/paper';
import SearchBar from './searchbar';

const SearchContainer = async() => {
    const papers = await fetchPapers();
    console.log("PAPERS: ", papers);
    
  return (
    <main className='md:mt-[5%]'>
     <SearchBar papers={papers}/>
    </main>
  )
}

export default SearchContainer
