import { useEffect, useState } from 'react';
import { getAllGymCenters } from '@/api/gymCenter';

export default function useGymCenters({ isDefaultGet }: { isDefaultGet: boolean }) {
  const [gymCenters, setGymCenters] = useState([]);

  useEffect(() => {
    if (isDefaultGet) {
      getGymCenters();
    }
  }, [isDefaultGet]);

  const getGymCenters = async () => {
    try {
      const result = await getAllGymCenters();
      setGymCenters(result.data);
    } catch (error) {
      console.error('Error fetching gym centers:', error);
    }
  };

  return [gymCenters, getGymCenters];
}
