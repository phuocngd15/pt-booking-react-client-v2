import { memo} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.less';
import type { UseInfoType } from '@/server/useInfo';
import { getUserInfo } from '@/server/useInfo';
import { setStorage } from '@/utils/storage';
import { initAsyncRoute } from '@/router/utils';
import SignIn from '@/views/Login/SignInForm';

const Login = memo(() => {
  const navigate = useNavigate();

  const onLogin = async (user: string, pwd: string): Promise<void> => {
    const res = await getUserInfo(user, pwd);
    if (res.code === 1) {
      await initAsyncRoute(res.data);
      setStorage<UseInfoType>('userInfo', res.data);
      navigate('/home');
    }
  };
  return <SignIn handleSubmit={onLogin} />;
});

export default Login;
