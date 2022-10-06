import { client, checkError } from './client';

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

export async function updateDog(updatedDog) {
  const response = await client
    .from('adopt-a-dog')
    .update(updatedDog)
    .match(updatedDog.id)
    .single();
  console.log(response);
}
