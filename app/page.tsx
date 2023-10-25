import ProductBox from "@/components/productBox";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.product.findMany({
    select: {
      name: true,
      id: true,
      price: true,
      image: true,
    },
  });
  console.log(products);
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 h-full w-full">
      <div className="p-8">
        <div className="grid-container">
          {products.map((p, index) => (
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
