"use client";

import ProductBox from "@/components/productBox";
import { useSearchParams } from 'next/navigation';
import useSWR from "swr";
import {Loader2} from 'lucide-react';
import { Label } from "./ui/label";

export const dynamic = "force-dynamic";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  // if (!response.ok) {
  //   throw new Error("Failed to fetch posts");
  // }

  return response.json();
};

export default function ProductList() {
  // const router = useRouter()
  // const { search } = router.query;

  // const products = await db.product.findMany({
  //   select: {
  //     name: true,
  //     id: true,
  //     price: true,
  //     image: true,
  //   },
  //   where: {
  //     name: {
  //       contains: ""
  //     }
  //   }
  // });

  const queryParams = useSearchParams();
  const searchQuery = queryParams ? queryParams.get("q") : "";
  const startPriceQuery = queryParams ? Number(queryParams.get("startprice")) : 0;
  const endPriceQuery = queryParams ? Number(queryParams.get("endprice")) : 0;
  const sortMode = queryParams ? queryParams.get("sort") : undefined;

  let queryArray : Array<string> = []
        queryArray.push(`q=${searchQuery}`)   // It work = magic = don't fix it na
        // if (searchQuery) {
        //     queryArray.push(`q=${searchQuery}`)
        // }
        if (startPriceQuery != 0) {
            queryArray.push(`startprice=${startPriceQuery}`)
        }
        if (endPriceQuery != 0) {
            queryArray.push(`endprice=${Number(endPriceQuery)}`)
        }

        if (sortMode) {
          queryArray.push(`sort=${sortMode}`)
        }




  const query = (queryArray.length != 0) && ("?" + queryArray.join("&"))

  const { data, isLoading } = useSWR(
    `/api/search${query}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  if (isLoading) {
    return <div className="bg-neutral-100 dark:bg-neutral-800 h-full w-full p-5">
            <Loader2 className="h-10 w-full animate-spin justify-center" />
          </div>;
  }

  if (!data?.message) {
    return null;
  }

  const products = data.message

  // if(!products) {
  //   return <div className="bg-neutral-100 dark:bg-neutral-800 h-full w-full p-5">
  //   <Label>No result found</Label>
  //   </div>;
  //   }



  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 min-h-full w-full">
      <div className="p-8">
        <div className="grid-container">
          {products.map((p: any, index: number) => (
            <ProductBox
              key={index}
              name={p.name}
              image={p.image}
              price={p.price}
              id={p.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
