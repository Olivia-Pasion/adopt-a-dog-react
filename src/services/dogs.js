import { client } from './client';

export async function getDogs() {
  const response = await client
    .from('adopt-a-dog')
    .select('*')
    .order('created_at', { ascending: false });
  return response.data;
}

export async function getDogDetail(id) {
  const response = await client.from('adopt-a-dog').select('*').match({ id }).single();
  return response.data;
}

export async function addNewDog(NewDog) {
  const response = await client.from('adopt-a-dog').insert(NewDog);
  return response.data;
}

export async function updateDog({ id, name, breed, bio, image }) {
  await client
    .from('adopt-a-dog')
    .update({ name, breed, bio, image })
    .match({ id });
}

export async function deleteDog({ id }) {
  await client.from('adopt-a-dog').delete().match({ id }).single();
}
