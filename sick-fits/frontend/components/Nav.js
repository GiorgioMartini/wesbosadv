import Link from 'next/link'

export default function Nav() {
  return (
    <nav>
      <Link href="/Products">Products</Link>
      <Link href="/sell">sell</Link>
      <Link href="/orders">orders</Link>
      <Link href="/account">account</Link>
    </nav>
  )
}
