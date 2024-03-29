import Link from 'next/link';
import gql from 'graphql-tag';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { useCart } from '../lib/cartState';

export default function Product({ product }) {
  const { openCart } = useCart();

  return (
    <ItemStyles>
      <img src={product?.photo?.image?.publicUrlTransformed} alt="x" />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product?.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <AddToCart onClick={openCart} id={product.id} />
        <DeleteProduct id={product.id}>Delete</DeleteProduct>
      </div>
    </ItemStyles>
  );
}

// Arb3!t84mt1982
