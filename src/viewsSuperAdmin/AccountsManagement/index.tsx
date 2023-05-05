import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import AccountsTable from './components/AccountsTable';
import type { Account } from '@/views/api/accounts';
import { getAccounts } from '@/views/api/accounts';
import { DetailCusGrid } from '@/views/CusManagement/components/DetailCusGird';

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
  console.log('AccountsManagement');
  if (!data.length) return <Spin />;
  return (
    <Row gutter={[12, 12]}>
      <Col lg={8} sm={24} xs={24}>
        <Card size="small" title="">
          <div>
            <div>
              <span>Username:</span>
              <input onChange={(e) => setSearchUserName(e.currentTarget.value)} />
            </div>
            <AccountsTable
              dataSource={
                searchUserName ? data.filter((e) => e.username.includes(searchUserName)) : data
              }
              onCickDetailCallback={(e: Account) => setDetailAccount(e)}
            />
          </div>
        </Card>
      </Col>
      <Col lg={16} sm={24} xs={24}>
        <Card size="small" title="">
          <DetailCusGrid />
          <DetailAccount data={detailAccount} />
        </Card>
      </Col>
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
