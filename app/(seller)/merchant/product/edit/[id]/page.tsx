import EditForm from "./editForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Store } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default async function Page({ params }: { params: { id: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await db.user.findUnique({
    where: {
      id: user.id as string,
    },
  });
  const id = parseInt(params.id)
  const productData = await db.product.findUnique({
    where: {
      id: id,
      ownerId: userData?.id
    }
  })
  if (!productData) {
    redirect('/')
  }
  return (
    <div className="relative flex min-h-full flex-col gap-3 bg-neutral-100 p-3 dark:bg-neutral-800">
      <div className="px-5 flex flex-row space-x-3">
        <Store className="content-center" size={25}></Store>
        <h3 className="text-lg font-medium">Merchant &gt; Product &gt; Editing</h3>
      </div>
      <Separator />
      <EditForm productData={productData} id={id}/>
    </div>
  );
}
