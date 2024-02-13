import { gql } from 'graphql-tag';
import styled from 'styled-components';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      price
      description
      name
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  console.log(data);
  if (loading) return <p>loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { Product } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick fits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div className="details">
        <h2>{Product.name}</h2>
        <h2>{Product.description}</h2>
      </div>
    </ProductStyles>
  );
}
