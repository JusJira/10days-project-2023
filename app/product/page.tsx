import { Separator } from "@/components/ui/separator";
import ProductPanel from "./ProductPanel";
import { Package } from "lucide-react";

export default async function ProductPage() {
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Package className="content-center" size={25}></Package>
        <h3 className="text-lg font-medium">Product</h3>
      </div>
      <Separator />
      <ProductPanel path="product" />
    </div>
    
  );
}
