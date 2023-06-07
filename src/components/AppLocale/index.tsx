import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { memo, useMemo } from 'react';
import SvgIcon from '../SvgIcon';
import type { LocaleType } from '@/locales';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAppLocale } from '@/store/modules/app';

const Locale = memo(() => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.app.locale);

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      { label: 'English', key: 'en-US', disabled: locale === 'en-US' },
      { label: 'VietName', key: 'vi-VN', disabled: locale === 'vi-VN' },
      { label: '中文', key: 'zh-CN', disabled: locale === 'zh-CN' },
    ];
  }, [locale]);

  const menuClick: MenuProps['onClick'] = (info) => {
    dispatch(setAppLocale(info.key as LocaleType));
  };

  return (
    <Dropdown
      menu={{ items: menuItems, onClick: menuClick }}
      placement="bottom"
      trigger={['click']}
    >
      <span style={{ fontSize: '1em' }}>
        <SvgIcon name="locales" />
      </span>
    </Dropdown>
  );
});

export default Locale;
