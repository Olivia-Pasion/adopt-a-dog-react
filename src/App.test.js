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

const newDog = {
  image: 'https://placedog.net/800/640?id=1',
  name: 'name2',
  breed: 'breed',
  bio: 'bio',
};

test('new dog page renders and posts the dog', async () => {
  authFns.getUser.mockReturnValue(existingUser);
  dogsFns.getDogs.mockReturnValue(dogs);
  dogsFns.addNewDog.mockReturnValue(newDog);

  render(
    <UserProvider>
      <MemoryRouter>
        <App></App>
      </MemoryRouter>
    </UserProvider>
  );
  const navToNewDog = screen.getByText('Add New Dog');
  fireEvent.click(navToNewDog);

  const imageInput = screen.getByPlaceholderText('url');
  fireEvent.change(imageInput, { target: { value: newDog.image } });
  expect(imageInput.value).toBe(newDog.image);

  const nameInput = screen.getByLabelText('Name:');
  fireEvent.change(nameInput, { target: { value: newDog.name } });
  expect(nameInput.value).toBe(newDog.name);

  const bioInput = screen.getByLabelText('Bio:');
  fireEvent.change(bioInput, { target: { value: newDog.bio } });
  expect(bioInput.value).toBe(newDog.bio);

  const breedInput = screen.getByLabelText('Breed:');
  fireEvent.change(breedInput, { target: { value: newDog.breed } });
  expect(breedInput.value).toBe(newDog.breed);

  const submit = screen.getByText('Add');
  fireEvent.click(submit);

  const test = await screen.findByText(/name/);
  expect(test).toBeInTheDocument();
});
