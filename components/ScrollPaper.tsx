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

const ScrollPaper = ({
  filteredItems,
}: {
  filteredItems: SearchResultsProps[];
}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Carousel className="w-[90%]">
        <CarouselContent>
          {filteredItems.map((item) => (
            <CarouselItem key={item.id} className="w-[30%] md:basis-1/2 basis-1/1">
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-lg">{item.title}</h1>
                  </CardTitle>
                  <CardDescription className="md:flex hidden">
                    {item.abstract.slice(0,1050)}...
                  </CardDescription>
                  <CardDescription className="md:hidden flex">
                    {item.abstract.slice(0, 250)}...
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex gap-4 mt-2 md:text-md text-sm">
                    {item.categories.map((category) => (
                      <p key={category.id}>{category.name}</p>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="mt-2">
                    <Link href={item.pdfUrl} className="text-sm underline">
                      View PDF
                    </Link>
                  </div>
                  <div className="text-sm">
                    {new Date(item.datePublished).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="md:block hidden">
        <CarouselPrevious/>
        <CarouselNext/>
        </div>
      </Carousel>
    </div>
  );
};

export default ScrollPaper;
