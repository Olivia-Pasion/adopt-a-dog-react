import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import * as authFns from './services/auth';
import * as dogsFns from './services/dogs';
import * as dogsHook from './hooks/useDogs';
import * as detailHook from './hooks/useDogDetail';

jest.mock('./services/auth');
jest.mock('./services/dogs');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  email: 'mock@user.com',
  password: 'mockuser'
};

const mockDog = {
  name: 'jelly',
  breed: 'Samoyed',
  bio: 'I love peanut butter',
  image: 'https://www.thefarmersdog.com/digest/wp-content/uploads/2022/04/Samoyed-top.jpg'
};

const mockDogList = [
  { id: 1, name: 'Jerry', breed: 'hound', bio: 'what is up with that', image: ''}, 
  { id: 2, name: 'Kramer', breed: 'poodle', bio: 'tzt tzt', image: ''} 
]

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
  await screen.findByText(/Kramer/i);
});
