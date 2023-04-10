import { Button, theme } from 'antd';
import { memo, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SvgIcon from '@/components/SvgIcon';
import './index.less';
import AppTheme from '@/components/AppTheme';
import AppLocale from '@/components/AppLocale';
import { addClass, removeClass } from '@/utils/operate';
import type { UseInfoType } from '@/server/useInfo';
import { getUserInfo } from '@/server/useInfo';
import { setStorage } from '@/utils/storage';
import { initAsyncRoute } from '@/router/utils';

const Login = memo(() => {
  const thme = theme.useToken();

  const [user, setUser] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');

  const navigate = useNavigate();

  const onLogin = async (): Promise<void> => {
    const res = await getUserInfo(user, pwd);
    if (res.code === 1) {
      await initAsyncRoute(res.data);
      setStorage<UseInfoType>('userInfo', res.data);
      navigate('/home');
    }
  };

  function onUserFocus() {
    addClass(document.querySelector('.user'), 'focus');
  }

  function onUserBlur() {
    if (user.length === 0) removeClass(document.querySelector('.user'), 'focus');
  }

  function onPwdFocus() {
    addClass(document.querySelector('.pwd'), 'focus');
  }

  function onPwdBlur() {
    if (pwd.length === 0) removeClass(document.querySelector('.pwd'), 'focus');
  }

  return (
    <div
      className="page-login"
      style={{ backgroundColor: thme.token.colorBgContainer, color: thme.token.colorText }}
    >
      <div className="container mx-auto">
        {/* <img src="@/assets/login/bg.png" class="wave" /> */}
        <div className="wave">
          <div className="bg" style={{ backgroundColor: thme.token.colorBgContainer }} />
          <div className="prospect" style={{ backgroundColor: thme.token.colorPrimary }} />
          <div className="prospect-bg" style={{ backgroundColor: thme.token.colorPrimary }} />
        </div>
        <div className="img -enter-x" style={{ color: thme.token.colorPrimary }}>
          <SvgIcon name="login_Illustration" />
        </div>
        <div className="application">
          <AppLocale />
          <AppTheme />
        </div>
        <div className="login-box">
          <div className="login-form">
            <h2 className="enter-x p-4">Online Personal Trainer</h2>
            {/*<div className="enter-x">user：admin, pass：admin123</div>*/}
            <div className="input-group user enter-x">
              <UserOutlined className="icon" />
              <div>
                <h5>username</h5>
                <input
                  value={user}
                  type="text"
                  className="input"
                  style={{ color: thme.token.colorText }}
                  onFocus={onUserFocus}
                  onBlur={onUserBlur}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group pwd enter-x">
              <LockOutlined className="icon" />
              <div>
                <h5>pass</h5>
                <input
                  type="password"
                  value={pwd}
                  className="input"
                  style={{ color: thme.token.colorText }}
                  autoComplete="on"
                  onFocus={onPwdFocus}
                  onBlur={onPwdBlur}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
            </div>
            <Button className="btn enter-x" type="primary" onClick={() => onLogin()}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
