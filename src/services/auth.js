import { client, checkError } from './client';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let response;
  if (type === 'sign-up') {
    try {
      response = await client.auth.signUp({ email, password });
    } catch (e) {
      return checkError(e.message);
    }
  } else {
    try {
      response = await client.auth.signIn({ email, password });
    } catch (e) {
      return checkError(e.message);
    }
  }
  return response.user;
}

export async function supaSignOut() {
  await client.auth.signOut();
}
