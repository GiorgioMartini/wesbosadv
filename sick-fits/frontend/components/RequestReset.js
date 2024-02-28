import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useFormHook';
import Form from './styles/Form';
// import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup();
    console.log({ data, loading, error });
    resetForm();
  }

  if (data?.createUser) {
    return <p>Signed up with {data?.createUser.email} - Log in!</p>;
  }

  console.log('xxx', data?.sendUserPasswordResetLink);

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <h2>Request reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && <p>Check your email</p>}
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request reset!</button>
      </fieldset>
    </Form>
  );
}
