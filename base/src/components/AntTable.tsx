import React, { useRef, useState } from "react";
import { useMemo } from "react";
import { Button, Form, Input, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import {SearchOutlined, PlusOutlined, DeleteOutlined} from "@ant-design/icons";
import STUDENTS from "../assets/students.json";
import Paper from "@mui/material/Paper";
import _, { flatten } from "lodash";
import { usStates } from "../assets/makeData";
import { Outlet, useNavigate } from "react-router-dom";
import withAuth from "../utils/WithAuth";

//data type
type Student = {
  id: number;
  name: string;
  email: string;
  phone: string;
  standard: number;
  section: string;
  age: number;
  date_of_birth: string;
  date_of_admission: string;
  address: {
    pincode: string;
    city: string;
    street: string;
    state: string;
  };
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const AntTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGlobalSearch, setIsGlobalSearch] = useState<boolean>(true);
  const [globalSearchValue, setGlobalSearchValue] = useState<string>('');
  const [form] = Form.useForm();
  const [data, setData] = useState<Student[]>(STUDENTS);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, Student>>({});

  const navigate = useNavigate();

  // const data1: Student[] = [{
  //   "id": 1,
  //   "name": "Dipali Marar",
  //   "email": "Daevika_Gill46@yahoo.co.in",
  //   "phone": "+918323331146",
  //   "standard": 1,
  //   "section": "B",
  //   "age": 13,
  //   "date_of_birth": "1995-11-17T00:08:59.890Z",
  //   "date_of_admission": "2011-10-17T00:40:01.399Z",
  //   "address": {
  //     "pincode": "714 689",
  //     "city": "Richardson",
  //     "street": "15353 Mandakini Mill",
  //     "state": "Nagaland"
  //   }
  // },
  // {
  //   "id": 2,
  //   "name": "Deependra Tandon",
  //   "email": "Charuvrat_Johar@hotmail.com",
  //   "phone": "+91-910-7598718",
  //   "standard": 11,
  //   "section": "A",
  //   "age": 14,
  //   "date_of_birth": "1998-06-21T06:55:55.055Z",
  //   "date_of_admission": "2016-02-18T04:21:15.235Z",
  //   "address": {
  //     "pincode": "826 790",
  //     "city": "Brockton",
  //     "street": "3121 Rakesh Mountain",
  //     "state": "Jharkhand"
  //   }
  // },];

  const [editingKey, setEditingKey] = useState<number>(0);

  // rowSelection object indicates the need for row selection
const rowSelection: TableProps<Student>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: Student[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    setSelectedRows(selectedRows);
  },
  getCheckboxProps: (record: Student) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
  };

  const isEditing = (record: any) => record.id === editingKey;
  console.log("editingKey", editingKey);

  const handleSave = (row: any) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.id === item.id);
    if (index > -1) {
      newData[index] = { ...newData[index], ...row };
      setData(newData);
    }
  };

  const edit = (key: number) => {
    setEditingKey(key);
  };

  const save = (row: any) => {
    setEditingKey(0);
    // Handle saving logic here
    const newData = [...data];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setData(newData);
  };

  const saveCell = (event: any, record: any, objProperty: string, subObjProperty: string) => {
    const newData = [...data];
    const target = newData.find((item) => item.id === record.id);
    if (target){
      subObjProperty == '' ? (target[objProperty as keyof Student] as any) = event.target.value : (target[objProperty as keyof Student] as any)[subObjProperty as keyof Student] = event.target.value;
      console.log(target['address']);     
      console.log(target['address']['state']);     
    } 
    setData(newData); 
    
  }

  const deleteRows = () => {
    const newData = data.filter((item) => !selectedRows.includes(item.id));
    setData(newData);
  }

  type ColumnTypes = Exclude<TableProps<Student>["columns"], undefined>;

  const columns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex?: string;
  })[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      width: 50,
      //for global search
      filteredValue: [globalSearchValue],
      onFilter: (value: any, record) => {        
        return isGlobalSearch ? (
           String(record.name).toLowerCase().includes(value.toLowerCase()) || 
          String(record.email).toLowerCase().includes(value.toLowerCase()) || 
          String(record.age).toLowerCase().includes(value.toLowerCase()) || 
          String(record.phone).toLowerCase().includes(value.toLowerCase()) || 
          String(record.standard).toLowerCase().includes(value.toLowerCase()) || 
          String(record.section).toLowerCase().includes(value.toLowerCase()) || 
          String(record.address.pincode).toLowerCase().includes(value.toLowerCase()) || 
          String(record.address.city).toLowerCase().includes(value.toLowerCase()) || 
          String(record.address.street).toLowerCase().includes(value.toLowerCase()) || 
          String(record.address.state).toLowerCase().includes(value.toLowerCase()) 
        ) : String(record.name).toLowerCase().includes(value.toLowerCase())
      },
      filterSearch: true,
    },
    {
      key: "name",
      title: "Full Name",
      dataIndex: "name",
      width: 150,
      render: (_, record) =>
        <Input defaultValue={record.name} onBlur={(e)=>saveCell(e, record, 'name', '')} />,
      fixed: "left",      
      //for column search
      filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
          <>
          <Input 
          autoFocus 
          value={selectedKeys[0]}
          placeholder="Search here"
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
          }}
          onPressEnter={(e:any)=>{
            setIsGlobalSearch(false);
            setGlobalSearchValue(e.target.value)
            // setSelectedKeys(e.target.value ? [e.target.value] : []); 
            confirm();
          }}
          ></Input>
          <Button 
            type="primary" 
            onClick={() => {
              clearFilters?.();
              setIsGlobalSearch(true);
            }} 
            icon={<SearchOutlined />} 
            size="small" 
            style={{ width: 90, marginTop: 8, marginRight: 8 }}>
            Reset
          </Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value: any, record) => {        
        return (String(record.name).toLowerCase().includes(value.toLowerCase()))
      },
      filterSearch: true,
    },
    {
      key: "email",
      title: "Email Address",
      dataIndex: "email",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.email} onBlur={(e)=>saveCell(e, record, 'email', '')} />,
    },
    {
      key: "phone",
      title: "Phone Number",
      dataIndex: "phone",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.phone} onBlur={(e)=>saveCell(e, record, 'phone', '')} />,     
    },
    {
      key: "standard",
      title: "Class Name",
      dataIndex: "standard",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.standard} onBlur={(e)=>saveCell(e, record, 'standard', '')} />,
    },
    {
      key: "section",
      title: "Section Name",
      dataIndex: "section",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.section} onBlur={(e)=>saveCell(e, record, 'section', '')} />,
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
      width: 80,
      render: (_, record) =>
        <Input defaultValue={record.age} onBlur={(e)=>saveCell(e, record, 'age', '')} />,
      sorter: (a, b) => a.age - b.age,
    },
    {
      key: "date_of_birth",
      title: "DOB",
      dataIndex: "date_of_birth",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.date_of_birth} onBlur={(e)=>saveCell(e, record, 'date_of_birth', '')} />,
    },
    {
      key: "date_of_admission",
      title: "DOA",
      dataIndex: "date_of_admission",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.date_of_admission} onBlur={(e)=>saveCell(e, record, 'date_of_admission', '')} />,
    },
    {
      key: "pincode",
      title: "Pin Code",
      dataIndex: "pincode",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.address.pincode} onBlur={(e)=>saveCell(e, record, 'address', 'pincode')} />,
    },
    {
      key: "city",
      title: "City Name",
      dataIndex: "city",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.address.city} onBlur={(e)=>saveCell(e, record, 'address', 'city')} />,
    },
    {
      key: "street",
      title: "Street Name",
      dataIndex: "street",
      ellipsis: true,
      render: (_, record) =>
        <Input defaultValue={record.address.street} onBlur={(e)=>saveCell(e, record, 'address', 'street')} />,
    },
    {
      key: "state",
      title: "State Name",
      dataIndex: "state",
      ellipsis: true,
      render: (_, record) =>  <Input defaultValue={record.address.state} onBlur={(e)=>saveCell(e, record, 'address', 'state')} />,
      editable: true,
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: (_, record) =>
    //     isEditing(record) ? (
    //       <Button onClick={() => save(record)}>Save</Button>
    //     ) : (
    //       <Button onClick={() => edit(record.id)}>Edit</Button>
    //     ),
    //   fixed: "right",
    // },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: typeof col.title === "string" ? col.title : undefined,
        handleSave,
      }),
    };
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center w-auto gap-4">
        <h1 className="text-4xl">Ant Table</h1>
        <Button
          className="flex w-48 mb-16"
          variant="filled"
          color="primary"
          onClick={() => setIsLoading(false)}
        >
          Load Data
        </Button>
      </div>
      <Outlet />
      <div className="flex flex-col justify-center items-center w-3/4">
        <Form form={form} component={false}>
          <Table<Student>
            // components={{
            //   body: {
            //     cell: EditableCell,
            //   },
            // }}
            loading={isLoading}
            columns={columns}
            dataSource={data}
            rowKey="id"
            size="small"
            bordered
            scroll={{ x: 1500, y: 500 }}
            pagination={{ pageSize: 5 }}
            title={() => (
              <div className="flex flow-row w-full justify-center items-center text-xl font-bold text-gray-700 mx-3">
                <div className="flex w-auto justify-start items-center">
                <p>Users Table</p>
                <Button
                  className="ml-4"
                  color="primary"
                  onClick={() => deleteRows()}
                >
                  <DeleteOutlined />
                </Button>
                </div>
                <Input.Search
                  className="flex w-60 justify-end items-center"
                  placeholder="Search here"
                  onSearch={(value) => {
                    setGlobalSearchValue(value);
                  }}
                />
                </div>
            )}
            footer={() => "End of Table"}
            rowSelection={ rowSelection }
          />
        </Form>
      </div>
      {/* <Paper className='flex flex-col justify-center p-4 m-16'>
  </Paper> */}
    </>
  );
};

const EditableCell: React.FC<{
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: Student) => void;
}> = ({ editable, children, dataIndex, record, handleSave }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(typeof record[dataIndex] == "object" ? record.address[dataIndex] : record[dataIndex]);
console.log("record", record);
console.log("data indexxx", dataIndex);
console.log("record[dddii]", record[dataIndex]);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = () => {
    toggleEdit();
    handleSave({ ...record, [dataIndex]: value });
  };

  return (
    <td>
      {editable ? (
        // editing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              if (value === record[dataIndex]) {
                toggleEdit();
              } else {
                save();
              }
            }}
          />
      ) : (
        children
      )}
    </td>
  );
};



export default withAuth(AntTable);
