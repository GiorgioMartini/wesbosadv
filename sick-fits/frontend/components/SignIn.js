import { gql } from 'graphql-tag';
import useForm from '../lib/useFormHook';
import Form from './styles/Form';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String! ) {

  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { error, loading }] = useMutation(SIGNIN_MUTATION);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} method="POST">
      <h2>Sign in to your account</h2>
      <fieldset>
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
      </fieldset>
      <label htmlFor="password">
        password
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Sign In!</button>
    </Form>
  );
}
