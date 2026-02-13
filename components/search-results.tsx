import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <div className="flex flex-col items-center justify-center gap-6 md:w-full w-[90%]">
      {/* ---------- GRID VIEW ---------- */}
      <div className="flex flex-col items-center gap-6 w-full">
        {filteredItems.map((item) => (
          <Card className="md:w-[48%] w-[90%]" key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription className="md:flex hidden">
                {item.abstract}
              </CardDescription>
              <CardDescription className="md:hidden flex">
                {item.abstract.slice(0,250)}...
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex gap-4 mt-2">
                {item.categories.map((category) => (
                  <p key={category.id}>{category.name}</p>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="mt-2">
                <Link href={item.pdfUrl}>View PDF</Link>
              </div>
              <div>
                {new Date(item.datePublished).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
