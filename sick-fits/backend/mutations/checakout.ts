import { Context } from ".keystone/types";
import { Order } from ".prisma/client";

interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: Context
): Promise<Order> {
  //
}

export { checkout };
