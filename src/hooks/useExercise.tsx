import { useEffect, useState } from 'react';
import { getAllExercise } from '@/api/exercise';

export default function useExercise({ isDefaultGet }: { isDefaultGet: boolean }) {
  const [exercises, setExercises] = useState<any>([]);

  useEffect(() => {
    if (isDefaultGet) {
      getExercises();
    }
  }, [isDefaultGet]);

  const getExercises = async () => {
    try {
      const result = await getAllExercise();
      result.data.forEach((e: any, i: number) => (e['key'] = (i + 1).toString()));
      setExercises(result.data);
    } catch (error) {
      console.error('Error fetching gym centers:', error);
    }
  };

  return [exercises, getExercises];
}
