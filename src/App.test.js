import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/userContext';

import * as authFns from './services/auth';
import * as dogFns from './services/dogs';

jest.mock('./services/auth');
jest.mock('./services/dogs');

const testUser = {
  id: '0dab2c65-5922-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@test.com',
};

const testDogsList = [
  {
    id: '1',
    name: 'Duncan',
    breed: 'Australian Shepherd',
    bio: 'Total sweetie',
    image: 'url',
    user_id: '0dab2c65-5922-469c-9f12-8fb47ebe52f2',
  },
  {
    id: '2',
    name: 'Marv',
    breed: 'Pomeranian',
    bio: 'Big ol ball of fluff.',
    image: 'url',
    user_id: '5',
  },
];

test('user can sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(testUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const emailInput = screen.getByLabelText('Email:');
  fireEvent.change(emailInput, { target: { value: 'test@test.comm' } });

  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByText('Sign Out');
  expect(headerText).toBeInTheDocument();

  screen.debug();
});

test('user can view all dogs and interact with their own', async () => {
  //user is already logged in
  authFns.getUser.mockReturnValue(testUser);
  dogFns.getDogs.mockReturnValue(testDogsList);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  //user can see list of generated dogs
  await screen.findByText(/Duncan/i);
  await screen.findByText(/Marv/i);

  //user sees edit & delete buttons
  await screen.findByText(/Modify Info/i);
  await screen.findByLabelText(/adopt-button/i);
});
