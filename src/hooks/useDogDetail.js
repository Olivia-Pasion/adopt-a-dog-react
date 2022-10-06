import { useEffect, useState } from 'react';
import { getDogDetail } from '../services/dogs';

export function useDogDetail(id) {
  const [dogDetail, setDogDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDogDetail(id);
      setDogDetail(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  return { dogDetail, loading };
}
