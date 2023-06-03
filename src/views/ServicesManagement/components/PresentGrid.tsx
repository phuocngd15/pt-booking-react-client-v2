import { Row, Col, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CustomTable } from '@/components/TableAnt';
import type { ServiceItem } from '@/server/serviceAPI';
// import { DetailCusGrid } from '@/views/CusManagement/components/DetailCusGird';
import { useAppDispatch } from '@/store/hooks';
import { changeStateDetailServiceItem } from '@/store/modules/services';
import { DetailServiceInfo } from '@/views/ServicesManagement/DetailService/DetailServiceInfo';
const UIGrid = ({ dataSource }) => {
  const dispatch = useAppDispatch();

  const columns: ColumnsType<ServiceItem> = [
    {
      dataIndex: 'name',
      key: 'name',
      filterSearch: true,
      filterMode: 'tree',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],

      //   ...getColumnSearchProps('name'),
      children: [],
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'fullName',
      render: (value, record, _index) => {
        return (
          <div>
            <a
              onClick={() => {
                dispatch(changeStateDetailServiceItem(record));
              }}
            >
              Detail
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <Row gutter={[12, 12]}>
      <Col lg={8} sm={24} xs={24}>
        <Card size="small" title="">
          <CustomTable columns={columns} dataSource={dataSource} />
        </Card>
      </Col>
      <Col lg={16} sm={24} xs={24}>
        <Card size="small" title="">
          <DetailServiceInfo />
        </Card>
      </Col>
    </Row>
  );
};

export default UIGrid;
