import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log(query, 'page');
  return (
    <div>
      <Reset token={query?.token} />
    </div>
  );
}
