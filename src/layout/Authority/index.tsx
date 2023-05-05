import { Navigate } from 'react-router-dom';
import type { UseInfoType } from '@/views/api/auth';
import { getStorage } from '@/utils/storage';

interface AuthorityType {
  children: React.ReactNode;
}

const Authority = ({ children }: AuthorityType) => {
  const userInfo = getStorage<UseInfoType>('userInfo');

  if (!userInfo) return <Navigate to="/customer/home" />;

  return <>{children}</>;
};

export default Authority;
