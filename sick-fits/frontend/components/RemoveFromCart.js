import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
// import { ALL_PRODUCTS_QUERY } from './Products';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const DELETE_FROM_CART_MUTATION = gql`
  mutation DELETE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [deleteFromCart, { loading }] = useMutation(DELETE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    // refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    update,
  });

  return (
    <BigButton disabled={loading} onClick={deleteFromCart}>
      Remove from Cart
    </BigButton>
  );
}
