import React, { useContext, useEffect, useRef, useState } from 'react';
import { Space, Table, Tag, Button, Modal, Form, Input, Popconfirm } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { InputRef } from 'antd';
import './styleEditTag.less';
import { getActivitiesUnComplete, IActivity } from '@/api/dailyActivitiesTask';
import type { Customer } from '@/api/user';
import { getMyCustomers, updateMyUserTags } from '@/api/user';
import { CustomBtnModal } from '@/components/CustomBtnModal';
import FormAddWorkout from '@/viewsTrainer/MyCustomer/components/FormAddWorkout';

const { Column, ColumnGroup } = Table;

export default function MyCustomer() {
  const [data, setData] = useState<Customer[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getMyCustomers();
      if (result.code) {
        setData(result.data);
      }
    })();
    return () => {};
  }, []);

  return (
    <DataTable
      data={data}
      refreshData={() => {
        getMyCustomers().then((result) => {
          if (result.code) {
            setData(result.data);
          }
        });
      }}
    />
  );
}

function DataTable({ data, refreshData }) {
  const inputRef = useRef<InputRef>(null);

  return (
    <Table dataSource={data.users} size="middle">
      <Column title="Full Name" dataIndex="fullName" key="fullName" />
      <Column title="Gender" dataIndex="gender" key="gender" />
      <Column title="Age" dataIndex="age" key="age" />
      <Column title="Weight" dataIndex="weight" key="weight" />
      <Column title="Height" dataIndex="height" key="height" />
      <Column
        title="Tags"
        dataIndex="tags"
        key="tags"
        render={(tags: string[]) => (
          <>
            {tags.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <CustomBtnModal
              width={400}
              nameBtn={'Add workout activity'}
              customForm={
                <FormAddWorkout
                  handleSubmit={() => {
                    console.log(e);
                  }}
                />
              }
              icon={undefined}
              onCreate={() => {}}
            />
            <EditTag data={record} refreshData={refreshData} />
          </Space>
        )}
      />
    </Table>
  );
}

function EditTag({ data, refreshData }: { data: any; refreshData: Function }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [newTags, setNewTags] = useState();
  console.log('data', data);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    console.log('newTags', newTags);
    updateMyUserTags({ tags: newTags }, data._id).then((e) => {
      setOpen(false);
      setConfirmLoading(false);
      refreshData();
    });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleChangeTags = (tags) => {
    console.log('handleChangeTags', tags);
    setNewTags(tags.map((e) => e.name));
  };

  return (
    <>
      <Button onClick={showModal}>Edit tag</Button>
      <Modal
        title="Edit Tags"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okType={'default'}
        okText={'Save'}
      >
        {/*<p>{modalText}</p>*/}
        {/*<div>*/}
        {/*  {data?.tags.map((tag) => (*/}
        {/*    <Tag color="blue" key={tag}>*/}
        {/*      {tag}*/}
        {/*    </Tag>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <TableTags
          Tags={data?.tags.map((e, i) => {
            const item: TagType = { name: e, key: i.toString() };
            return item;
          })}
          onChangeData={handleChangeTags}
        />
      </Modal>
    </>
  );
}

// edit
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface TagType {
  key: React.Key;
  name: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

function TableTags({ Tags, onChangeData }: { Tags: TagType[]; onChangeData: Function }) {
  const [dataSource, setDataSource] = useState<TagType[]>(Tags);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
    onChangeData(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Tag',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      width: '30%',
      title: 'Action',
      dataIndex: 'action',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
            okType={'danger'}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: TagType = {
      key: count,
      name: `New tag ${count}`,
    };
    setDataSource([...dataSource, newData]);
    onChangeData([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: TagType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    onChangeData(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: TagType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add a Tag
      </Button>
      <Table
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
}
