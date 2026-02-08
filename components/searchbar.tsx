"use client";
import { dataItems, searchItems } from "@/lib/constants";
import { useState, useMemo } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SearchResults from "./search-results";

type Item = {
  id: string
  title: string
  abstract: string
  pdfUrl: string
  datePublished: string
  status: string 
}

const SearchBar = ({papers} : {papers: Item[]}) => {

  const [query, setQuery] = useState("");
  const filteredItems = useMemo(() => {
    return searchItems(papers, query);
  }, [query, papers]);


  console.log(papers)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="md:w-[30%] w-[90%]">
        <Label>Search</Label>
        <div className="flex items-center">
        <Input
        placeholder="Search a research paper..."
          type="search"
          data-search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        </div>
      </div>
      <SearchResults filteredItems={filteredItems} />
    </div>
  );
};

export default SearchBar;
