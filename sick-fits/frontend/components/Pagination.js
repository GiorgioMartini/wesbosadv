import Head from 'next/head';
import PaginationStyles from './styles/PaginationStyles';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  // Always return first if there is an error or loading, else we cannot gran any data.
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  console.log({ page, pageCount });

  return (
    <PaginationStyles>
      <Head>
        <title>Sick fits | Page {page} of ___</title>
      </Head>
      <Link href={`/products/${parseInt(page) - 1}`}>
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${parseInt(page) + 1}`}>
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}
