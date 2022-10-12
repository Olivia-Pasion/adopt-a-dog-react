import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import * as authFns from './services/auth';
import * as dogsFns from './services/dogs';
import { act } from 'react-dom/test-utils';

jest.mock('./services/auth');
jest.mock('./services/dogs');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  email: 'mock@user.com',
  password: 'mockuser'
};

const mockDogList = [
  { id: 1, name: 'Jerry', breed: 'hound', bio: 'what is up with that', image: '', user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2' }, 
  { id: 2, name: 'Kramer', breed: 'poodle', bio: 'tzt tzt', image: '' } 
];

test('authenticated users can see dog list page', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  authFns.authUser.mockReturnValue(mockUser);
  dogsFns.getDogs.mockReturnValue(mockDogList);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/Jerry/i);
  await screen.findByText(/Modify Info/i);
  await screen.findByText(/Kramer/i);
  screen.debug();
});

it('authenticated user can navigate to add dog page', async () => {
  authFns.getUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const newDogLink = screen.getByText('Add New Dog');
  fireEvent.click(newDogLink);

  const newDogButton = await screen.getByText('Add');
  expect(newDogButton).toBeInTheDocument();

});

const mockDog = {
  name: 'jelly',
  breed: 'Samoyed',
  bio: 'I love peanut butter',
  image: 'https://www.thefarmersdog.com/digest/wp-content/uploads/2022/04/Samoyed-top.jpg'
};

it('authenticated user can submit a new dog', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  dogsFns.addNewDog.mockReturnValue(mockDog);
  dogsFns.getDogs.mockReturnValue([...mockDogList, mockDog]);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/newdog']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const nameInput = screen.getByLabelText('Name:');
  fireEvent.change(nameInput, { target: { value: mockDog.name } });

  const breedInput = screen.getByLabelText('Breed:');
  fireEvent.change(breedInput, { target: { value: mockDog.breed } });

  const bioInput = screen.getByLabelText('Bio:');
  fireEvent.change(bioInput, { target: { value: mockDog.bio } });

  const imageInput = screen.getByLabelText(`Copy this URL and add any number between 1-233 to the end for a cute dog picture https://placedog.net/800/640?id=`);
  fireEvent.change(imageInput, { target: { value: mockDog.image } });

  const submitDog = screen.getByRole('button');
  await act(async () => { 
    fireEvent.click(submitDog);
  });
  
  await screen.findByText(/Welcome to the Puppy Party!/i);
  
  const newDogInList = screen.getByText(`Hey there, I'm jelly!`);
  screen.debug();
  expect(newDogInList).toBeInTheDocument();

});
