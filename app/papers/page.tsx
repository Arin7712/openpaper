import SearchBar from '@/components/searchbar'
import { fetchPapers } from '@/lib/db/paper';
import React from 'react'

const page = async () => {
    const papers = await fetchPapers();
  
  return (
    <div>
      <SearchBar papers={papers}/>
    </div>
  )
}

export default page
