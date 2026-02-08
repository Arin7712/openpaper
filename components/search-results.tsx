import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type SearchResultsProps = {
  title: string;
  abstract: string;
  pdfUrl: string;
  datePublished: string;
  id: string;
  categories: Category[];
};
const SearchResults = ({
  filteredItems,
}: {
  filteredItems: SearchResultsProps[];
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {filteredItems.map((item) => (
          <Card className="w-60" key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>
                {" "}
                {new Date(item.datePublished).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </CardDescription>
              <CardContent>
                <div>
                  {item.categories.map((category) => (
                    <p key={category.id}>{category.name}</p>
                  ))}
                </div>
                <div>
                  <Link href={item.pdfUrl}>View PDF</Link>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
