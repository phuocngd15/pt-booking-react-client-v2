import React, { memo, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Card, Col, Input, Row, Space } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { changeStateDetailCus } from '@/store/modules/customer';
import { useAppDispatch } from '@/store/hooks';
import { CustomTable } from '@/components/TableAnt';
import { DetailCusGrid } from '@/viewsSuperAdmin/CustomerManagement/components/DetailCusGird';

interface DataType {
  key: React.Key;
  fullName: string;
  phone: string;
  cmnd: string;
  email: string;
  joindate: string;
  age: number;
  address: string;
  description?: string;
}

export interface CusListProps {
  dataSource: any;
}

export const CusList: React.FC<CusListProps> = memo(({ dataSource }) => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof DataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    const a = selectedKeys.map((e) => e.trim());
    setSearchText(a[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const CustomCell = ({ _value, record, _index }) => {
    return (
      <>
        <div>{record.fullName}</div>
        <div>{record.email}</div>
      </>
    );
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div className={'aaaaaaa'} style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() =>
            handleSearch(
              selectedKeys as string[],
              () => confirm({ closeDropdown: false }),
              dataIndex,
            )
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            onClick={() => {
              handleSearch([''], () => confirm({ closeDropdown: false }), dataIndex);
              if (clearFilters) handleReset(clearFilters);
            }}
            size="small"
            style={{ width: 90 }}
            disabled={selectedKeys.length === 0}
          >
            Reset
          </Button>
          <Button
            onClick={() =>
              handleSearch(
                selectedKeys as string[],
                () => confirm({ closeDropdown: false }),
                dataIndex,
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase().trim()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (value, record, index) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={value ? value.toString() : ''}
        />
      ) : (
        <CustomCell _value={value} record={record} _index={index} />
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: '',
      dataIndex: 'fullName',
      key: 'fullName',
      filterSearch: true,
      filterMode: 'tree',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend'],

      ...getColumnSearchProps('fullName'),
      children: [],
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'fullName',
      render: (value, record, _index) => {
        return (
          <div
            onClick={() => {
              dispatch(changeStateDetailCus(record));
            }}
          >
            <a>Detail</a>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col lg={8} sm={24} xs={24}>
          <Card size="small" title="">
            <CustomTable columns={columns} dataSource={dataSource} />
          </Card>
        </Col>
        <Col lg={16} sm={24} xs={24}>

            <DetailCusGrid />
        </Col>
      </Row>
    </>
  );
});

export default CusList;
