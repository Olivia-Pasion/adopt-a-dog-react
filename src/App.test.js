import { fireEvent, render, screen } from '@testing-library/react';
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
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

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
  const updatedDog = {
    id: '1',
    name: 'Quimby',
    breed: 'Irish Wolfhound',
    bio: 'Lanky AF',
    image: 'http://dog-url.com',
    user_id: '0dab2c65-5922-469c-9f12-8fb47ebe52f2',
  };

  //user is already logged in
  authFns.getUser.mockReturnValue(testUser);
  dogFns.getDogDetail.mockReturnValue(testDogsList[0]);
  dogFns.updateDog.mockReturnValue(updatedDog);
  dogFns.getDogs.mockReturnValue(testDogsList);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/updatedog/1']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  //dog detail loads with established information from getDogDetail
  const dogNameInput = await screen.findByLabelText(/Name:/i);
  expect(dogNameInput.value).toBe('Duncan');

  //inputs change value
  const nameInput = await screen.findByLabelText(/Name:/i);
  await act(async () => {
    fireEvent.change(nameInput, { target: { value: updatedDog.name } });
    expect(nameInput.value).toBe('Quimby');
  });

  const breedInput = await screen.findByLabelText(/Breed:/i);
  await act(async () => {
    fireEvent.change(breedInput, { target: { value: updatedDog.breed } });
    expect(breedInput.value).toBe(updatedDog.breed);
  });

  const bioInput = await screen.findByLabelText(/Bio:/i);
  await act(async () => {
    fireEvent.change(bioInput, { target: { value: updatedDog.bio } });
    expect(bioInput.value).toBe(updatedDog.bio);
  });

  const imageURLInput = await screen.findByLabelText(/Image URL:/i);
  await act(async () => {
    fireEvent.change(imageURLInput, { target: { value: updatedDog.image } });
    expect(imageURLInput.value).toBe(updatedDog.image);
  });

  //button event fires, triggering mockUpdate function updateDog
  const button = screen.getByRole('button');
  await act(async () => {
    fireEvent.click(button);
  });

  //user clicks Home button
  const homeLink = screen.getByText('Home');
  await act(async () => {
    fireEvent.click(homeLink);
  });

  screen.debug();
});

test('user can delete (adopt) a dog', async () => {
  authFns.getUser.mockReturnValue(testUser);
  dogFns.getDogs.mockReturnValue(testDogsList);
  dogFns.deleteDog.mockReturnValue(testDogsList[0]);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  //should have delete button
  const deleteButton = await screen.findByRole('button');
  expect(deleteButton).toBeInTheDocument();

  //on click
  await act(async () => {
    fireEvent.click(deleteButton);
  });

  screen.debug();
});
