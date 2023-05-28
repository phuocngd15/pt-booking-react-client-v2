import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Modal, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';

export default function EditRowData({
  data,
  title,
  _id,
  updateFunction,
  refreshData,
}: {
  data: any;
  title: string;
  _id: string;
  refreshData: Function;
  updateFunction: Function;
}) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const [newTags, setNewTags] = useState();
  const [newDataRow, setNewDataRow] = useState();
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    console.log('newTags', newTags);
    updateFunction(_id, newDataRow).then((result: any) => {
      console.log('updateFunction result ', result);
      setOpen(false);
      setConfirmLoading(false);
      refreshData();
    });
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleChangeTags = (newdata) => {
    setNewDataRow(newdata);
  };

  return (
    <>
      <Button onClick={showModal}>{title}</Button>
      <Modal
        title={title.toUpperCase()}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okType={'default'}
        okText={'Save'}
      >
        <TableTags Tags={data} onChangeData={handleChangeTags} />
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

interface RowType {
  key: React.Key;
  name: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

function TableTags({ Tags, onChangeData }: { Tags: RowType; onChangeData: Function }) {
  const [dataSource, setDataSource] = useState<RowType>(Tags);

  const [count, setCount] = useState(2);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Name',
      dataIndex: 'serviceName',
      editable: true,
    },
    {
      title: 'State',
      dataIndex: 'state',
      editable: true,
    },
    {
      title: 'Tag',
      dataIndex: 'serviceType',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      editable: true,
    },
  ];

  const handleSave = (row: RowType) => {
    console.log('handleSave', row);
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.key);
    // const item = newData[index];
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });
    setDataSource(row);
    onChangeData(row);
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
      onCell: (record: RowType) => ({
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
      {/*<Button onClick={handleAdd} style={{ marginBottom: 16 }}>*/}
      {/*  Add a Tag*/}
      {/*</Button>*/}
      <Table
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={[dataSource]}
        columns={columns as ColumnTypes}
      />
    </div>
  );
}
