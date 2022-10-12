import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/userContext';

import * as authFns from './services/auth';

jest.mock('./services/auth');

const testUser = {
  id: '0dab2c65-5922-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@test.com',
};

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

  //user should see their email displayed in header
  screen.debug();
});
