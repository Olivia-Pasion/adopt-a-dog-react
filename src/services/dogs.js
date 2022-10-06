import { client, checkError } from './client';

export async function getDogs() {
  const response = await client
    .from('adopt-a-dog')
    .select('*')
    .order('created_at', { ascending: false });
  return response.data;
}

export async function addNewDog(NewDog) {
  const response = await client.from('adopt-a-dog').insert(NewDog);
  return response.data;
}
