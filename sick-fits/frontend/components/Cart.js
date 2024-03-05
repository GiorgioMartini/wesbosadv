import styled from 'styled-components';
import { useUser } from './User';
import CartStyles from './styles/CartStyles';
import CloseButton from './styles/CloseButton';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';
import RemoveFromCart from './RemoveFromCart';
import { Checkout } from './Checkout';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  if (!cartItem?.product) return null;

  const product = cartItem?.product;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product?.name}
      />
      <div>
        <h3>{product?.name}</h3>
        <p>
          {formatMoney(product?.price * cartItem?.quantity)}-
          <em>
            {cartItem?.quantity} &times; {formatMoney(product.price)}
            each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem?.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();

  // console.log({ cartOpen });

  if (!me) return null;

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
        <CloseButton type="button" onClick={closeCart}>
          &times;
        </CloseButton>
      </header>
      <ul>
        {me.cart.map((x) => (
          <CartItem key={x.id} cartItem={x} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me?.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}

// try deleting it via graphiql
// create delete mutataion
// use the mutation on the button with refetch queries
