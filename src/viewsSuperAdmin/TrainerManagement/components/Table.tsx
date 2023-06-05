import React, { useRef, useState } from 'react';
import { Table, Button, Modal, Spin, Input, Space, Tag } from 'antd';
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Highlighter from 'react-highlight-words';
import { getDetailPt } from '@/server/getPTList';
import EditTrainer from '@/viewsSuperAdmin/TrainerManagement/components/EditTrainer';

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

export interface CustomTableProps {
  dataSource: any;
  refreshData: Function;
}

const CustomTable: React.FC<CustomTableProps> = ({ dataSource, refreshData }) => {
  const [dataModal, setDataModal] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const showModal = () => {
    setIsModalOpen(true);
    (async () => {
      const res = await getDetailPt();
      if (res.code === 1) {
        setDataModal(res.data);
      }
    })();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<DataType> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      filterSearch: true,
      filterMode: 'tree',
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('fullName'),
    },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', ...getColumnSearchProps('phone') },
    { title: 'Email', dataIndex: 'email', key: 'email', ...getColumnSearchProps('email') },
    {
      title: 'Skill',
      dataIndex: 'skills',
      key: 'skills',
      render: (value, record, index) => {
        return (
          <div>
            {value.map((e: any) => (
              <Tag>{e}</Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (value: any, record: any) => {
        return (
          <div>
            <a onClick={showModal}>Detail</a>
            {/* <a>Delete</a> */}
            <EditTrainer id={record._id} objectData={value} callBack={refreshData} />
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <>
      <Table columns={columns} dataSource={dataSource} scroll={{ y: 240 }} onChange={onChange} />
      <Modal
        title="Thông tin chi tiết PT"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!dataModal && <Spin />}
        {dataModal && <div>32323</div>}
      </Modal>
    </>
  );
};

export default CustomTable;
