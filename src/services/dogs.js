import { client, checkError } from './client';

export async function getDogs() {
  try {
    const response = await client.from('adopt-a-dog').select('*').order('created_at', { ascending: false });
    return response.data;
  } catch (e) {
    return checkError(e.message);
  }
}