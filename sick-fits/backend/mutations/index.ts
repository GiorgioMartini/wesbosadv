import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import { addToCart } from "./addToCart";
import { checkout } from "./checakout";

const gql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: gql`
    type Mutation {
      addToCart(productId: ID): CartItem
      checkout(token: String!): Order
    }
  `,
  resolvers: {
    Mutation: {
      addToCart,
      checkout,
    },
  },
});
