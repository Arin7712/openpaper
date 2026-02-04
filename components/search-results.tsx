import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'


const SearchResults = ({filteredItems} : {filteredItems: any[]}) => {
  return (
      <div className="flex flex-col items-center gap-2">
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
        {filteredItems.map((item) => (
          <Link href={`/papers/${item.id}`} key={item.id}>
          <Card className='w-60'>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
          </Link>
        ))}
        </div>
      </div>
  )
}

export default SearchResults
