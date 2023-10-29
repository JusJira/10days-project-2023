import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "./db";

/*
return user in our database
(Need to be called in server side?)
*/
export async function getDbUser(){
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    async function getUserData() {
        if (!isAuthenticated()) {
          return null;
        } else {
          const data = db.user.findFirst({where : {id : user.id as string}});
          return data;
        }
      }
    const dbUser = await getUserData()
    return dbUser;
} 