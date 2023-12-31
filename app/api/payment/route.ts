import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import * as z from "zod";
import { db } from "@/lib/db";

const postCreateSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .gte(0, {
      message: "Amount must be more than zero.",
    }),
  accId: z.number({
    required_error: "An account id is required.",
  }),
});

export async function POST(req: Request) {
  try {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (await !isAuthenticated()) {
      return new Response("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = postCreateSchema.parse(json);

    const amount = body.amount;

    const sender = await db.user.findFirst({
      where: {
        id: user.id as string
      }
    });

    const receiver = await db.user.findFirst({
        where: {
            accountId: body.accId
        }
    })

    if (!sender) {
        return new Response("No sender found", { status: 404 });
    }

    if (!receiver) {
        return new Response("No receiver found", { status: 404 });
    }
    if (sender && receiver) {
        if (amount > sender.balance) {
            return new Response("Amount is more than balance", { status: 405 });
        }
        else {
            await db.user.update({
                where: {
                  id: user.id as string,
                },
                data: {
                    balance: sender.balance - amount
                }
              });
            const receive = await db.user.update({
                where: {
                    id: receiver.id,
                },
                data: {
                    balance: receiver.balance + amount
                }
            })

            const transactionHistory: Array<{userId: string, amount: number, description: string}> = []
            transactionHistory.push({
              userId: sender.id,
              amount: -amount,
              description: `Transfer money to ${(receiver.displayName) ? receiver.displayName : ("accountId #" + receiver.accountId.toString()) }`
            })
            transactionHistory.push({
              userId: receiver.id,
              amount: amount,
              description: `Receive money from ${(sender.displayName) ? sender.displayName : ("accountId #" + sender.accountId.toString()) }`
            })

            const transRes = await db.transaction.createMany({ data : transactionHistory });

            return new Response(JSON.stringify(receive));
        }
    }

    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
