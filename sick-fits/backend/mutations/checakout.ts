import { Context, OrderCreateInput } from ".keystone/types";
// import { Order } from ".prisma/client";
import { CartItemCreateInput } from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

interface Arguments {
  token: string;
}

async function checkout(
  root: any,
  { token }: Arguments,
  context: Context
): Promise<OrderCreateInput> {
  // 1 make sure they are signed in

  const userId = context.session.itemId;

  if (!userId) {
    throw Error("must be sign in!");
  }

  const gql = String.raw;

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: gql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });

  console.dir(user, { depth: null });

  const cartitems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartitems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);

  console.log({ amount });

  // 2 calc the total price for their order

  // 3 create the payment with stripe

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((e) => {
      console.log(e);
      throw Error(e.message);
    });

  console.log({ charge });

  // 4 convert the cartitems to orderitems
  // 5 create the order and return it
}

export { checkout };
