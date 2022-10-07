import { client } from './client';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let response;
  if (type === 'sign-up') {
    response = await client.auth.signUp({ email, password });
  } else {
    response = await client.auth.signIn({ email, password });
  }
  console.log('response.user', response.user);
  return response.user;
}

export async function supaSignOut() {
  await client.auth.signOut();
}
