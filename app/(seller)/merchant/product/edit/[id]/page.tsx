import EditForm from "./editForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

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
    <div>
      <EditForm productData={productData} id={id}/>
    </div>
  );
}
