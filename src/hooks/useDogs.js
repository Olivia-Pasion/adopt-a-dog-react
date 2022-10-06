import { useEffect, useState } from 'react';
import { getDogs } from '../services/dogs';

export function useDogs() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const data = await getDogs();
      setDogs(data);
    }
    fetchData();
  }, []);
  return { dogs };
}

// might need setDogs in return