import { useEffect, useState } from 'react';
import { getDogDetail } from '../services/dogs';

export function useDogDetail(id) {
  const [dogDetail, setDogDetail] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDogDetail(id);
      setDogDetail(data);
    };
    fetchData();
  }, [id]);
  return { dogDetail };
}
