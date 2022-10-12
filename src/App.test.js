import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
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

  //user can see edit & delete buttons for their own dog
  await screen.findByLabelText(/adopt-button/i);
  const modifyButton = await screen.findByText(/Modify Info/i);
  fireEvent.click(modifyButton);

  //this confirms that user has been redirected after clickHandler has been fired
  const updateHeader = await screen.findByText(/Update Dog/i);
  expect(updateHeader).toBeInTheDocument();
});

test('user can update their own dog', async () => {
  //user is already logged in
  authFns.getUser.mockReturnValue(testUser);
  dogFns.getDogDetail.mockReturnValue(testDogsList[0]);
  dogFns.getDogs.mockReturnValue(testDogsList);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/updatedog/1']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  //dog detail loads with established information
  const dogNameInput = await screen.findByLabelText(/Name:/i);
  expect(dogNameInput.value).toBe('Duncan');

  //inputs change value
  const nameInput = await screen.findByLabelText(/Name:/i);
  await act(async () => {
    fireEvent.change(nameInput, { target: { value: 'Quimby' } });
    expect(nameInput.value).toBe('Quimby');
  });

  const breedInput = await screen.findByLabelText(/Breed:/i);
  await act(async () => {
    fireEvent.change(breedInput, { target: { value: 'Irish Wolfhound' } });
    expect(breedInput.value).toBe('Irish Wolfhound');
  });

  const bioInput = await screen.findByLabelText(/Bio:/i);
  await act(async () => {
    fireEvent.change(bioInput, { target: { value: 'Lanky AF' } });
    expect(bioInput.value).toBe('Lanky AF');
  });

  const imageURLInput = await screen.findByLabelText(/Image URL:/i);
  await act(async () => {
    fireEvent.change(imageURLInput, { target: { value: 'http://dog-url.com' } });
    expect(imageURLInput.value).toBe('http://dog-url.com');
  });

  //button event fires
  const button = screen.getByRole('button');
  fireEvent.click(button);
});

//queryByRole to expect().not.toBeInTheDocument();
