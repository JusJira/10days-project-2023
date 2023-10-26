import ProductBox from "@/components/productBox";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await db.product.findMany({
    select: {
      name: true,
      id: true,
      price: true,
      image: true,
    },
  });
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 min-h-[100dvh] w-full">
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
