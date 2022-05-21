import { useState, useEffect } from 'react';
import axios from 'utils/axios';

const useAllList = <T,>(
  url: string
): {
  list: T[];
} => {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async (): Promise<void> => {
    try {
      const res = await axios.get(url);
      setData(res.data.rows);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    list: data,
  };
};

export default useAllList;
