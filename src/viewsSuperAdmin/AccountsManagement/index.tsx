import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import AccountsTable from './components/AccountsTable';
import type { Account } from '@/api/accounts';
import { getAccounts, updateStatusAccount } from '@/api/accounts';

export default function AccountsManagement() {
  const [data, setData] = useState<Account[]>([]);
  const [searchUserName, setSearchUserName] = useState('');
  const [detailAccount, setDetailAccount] = useState<Account>();
  useEffect(() => {
    (async () => {
      const res = await getAccounts();
      if (res.code === 1) {
        console.log(res);
        res.data.forEach((e, i) => (e.key = ''.concat(e.username, i.toString())));
        setData(res.data);
        setDetailAccount(res.data[0]);
      }
    })();
    return () => {
      // cleanup logic here
    };
  }, []);

  if (!data.length) return <Spin />;

  const onClickBlockCallback = async (account: any) => {
    const res = await updateStatusAccount(account._id, 'block');
    if (res.code) {
      const res2 = await getAccounts();
      if (res2.code === 1) {
        res2.data.forEach((e, i) => (e.key = ''.concat(e.username, i.toString())));
        setData(res2.data);
        setDetailAccount(res2.data[0]);
      }
    }
  };
  const onClickActiveCallback = async (account: any) => {
    const res = await updateStatusAccount(account._id, 'active');
    if (res.code) {
      const res2 = await getAccounts();
      if (res2.code === 1) {
        res2.data.forEach((e, i) => (e.key = ''.concat(e.username, i.toString())));
        setData(res2.data);
        setDetailAccount(res2.data[0]);
      }
    }
  };
  return (
    <Row gutter={[12, 12]}>
      <Col lg={8} sm={24} xs={24}>
        <div className="w-72 mb-2">
          <label className="relative block">
            <span className="sr-only">Email address</span>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Username"
              onChange={(e) => setSearchUserName(e.currentTarget.value)}
            />
          </label>
        </div>
        <Card size="small" title="">
          <div>
            <AccountsTable
              dataSource={
                searchUserName ? data.filter((e) => e.username.includes(searchUserName)) : data
              }
              onClickBlockCallback={onClickBlockCallback}
              onClickActiveCallback={onClickActiveCallback}
            />
          </div>
        </Card>
      </Col>
      {/*<Col lg={16} sm={24} xs={24}>*/}
      {/*  <Card size="small" title="">*/}
      {/*    /!*<DetailCusGrid />*!/*/}
      {/*    <DetailAccount data={detailAccount} />*/}
      {/*  </Card>*/}
      {/*</Col>*/}
    </Row>
  );
}
interface DetailAccountProps {
  data: Account | undefined;
}
function DetailAccount({ data }: DetailAccountProps) {
  console.log('DetailAccount data', data);
  return <div>detailAccount</div>;
}
