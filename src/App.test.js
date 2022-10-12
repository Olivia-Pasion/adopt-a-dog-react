// import { render, screen } from '@testing-library/react';
// import App from './App';

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/userContext';

import * as authFns from './services/auth';
import * as dogsFns from './services/dogs';

jest.mock('./services/auth');
jest.mock('./services/dogs');

const existingUser = {
  id: 'anID',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@testing.com',
  password: 'password',
};

const dogs = [
  {
    img: 'www.google.com',
    name: 'name',
    breed: 'breed',
    bio: 'bio',
  },
];

test('can see log in page and log in', async () => {
  authFns.authUser.mockReturnValue(existingUser);
  dogsFns.getDogs.mockReturnValue(dogs);

  render(
    <UserProvider>
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    </UserProvider>
  );
  const header = screen.getByText('sign-up');
  expect(header.toBeInTheDocument);
  fireEvent.click(header);

  const emailInput = screen.getByPlaceholderText('email');
  fireEvent.change(emailInput, { target: { value: existingUser.email } });
  expect(emailInput.value).toBe(existingUser.email);

  const passwordInput = screen.getByPlaceholderText('password');
  fireEvent.change(passwordInput, { target: { value: existingUser.password } });
  expect(passwordInput.value).toBe(existingUser.password);

  const submit = screen.getByText('Submit');
  console.log(submit);
  fireEvent.click(submit);

  const signedIn = await screen.findByText(`Hello, ${existingUser.email}`);
  expect(signedIn).toBeInTheDocument();
});

test('dog card page renders', async () => {
  authFns.getUser.mockReturnValue(existingUser);
  dogsFns.getDogs.mockReturnValue(dogs);

  render(
    <UserProvider>
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    </UserProvider>
  );

  await screen.findByText(/name/, /breed/, /bio/);
});
