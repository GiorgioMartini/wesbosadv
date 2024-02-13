import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  // console.log(data, error, loading);

  if (loading) {
    return <p>loading</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div>
        <ProductListStyles>
          {data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ProductListStyles>
      </div>
    </div>
  );
}
