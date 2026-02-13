"use client";
import { dataItems, searchItems } from "@/lib/constants";
import { useState, useMemo } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SearchResults from "./search-results";
import { Field } from "./ui/field";

type Item = {
  id: string
  title: string
  abstract: string
  pdfUrl: string
  datePublished: Date
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
      <Field>
        <Label>Search</Label>
        <Input
        placeholder="Search a research paper..."
          type="search"
          data-search
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        </Field>
      </div>
      <SearchResults filteredItems={filteredItems} />
    </div>
  );
};

export default SearchBar;
