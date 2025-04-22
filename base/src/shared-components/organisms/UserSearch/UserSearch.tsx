import type { DatePickerProps } from "antd";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import React from "react";


type Props = {
    onCancelClick?: any;
    onSearchClick?: any;
}

const UserSearch = (props: Props) => {
  const [form] = Form.useForm();
  const formData = {
    userName: "John D",
    email: "johnd@gmail.com",
    firstName: "John",
    lastName: "Doe",
    phoneNo: "+94761289043",
    status: "Active",
  };

  const handleUserRoleChange = (value: string) => {
    console.log(`selected user role ${value}`);
  };
  const handleCreatedDateChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col w-96 h-auto justify-start items-center mt-6 p-2">
      <Form
        className="flex flex-col w-full justify-start items-start gap-2"
        layout={"horizontal"}
        form={form}
        variant="outlined"
        size="small"
        initialValues={{ layout: "horizontal" }}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        //   onValuesChange={}
      >
        <Form.Item key="userName" label="User Name" className="w-auto">
          <Input
            className="font-medium text-sm"
            placeholder="input placeholder"
            defaultValue=""
          />
        </Form.Item>
        <Form.Item key="email" label="E-mail" className="w-auto">
          <Input
            className="text-bold text-sm"
            placeholder="input placeholder"
            defaultValue="email"
          />
        </Form.Item>
        <Form.Item key="firstName" label="First Name" className="w-auto">
          <Input
            className="text-bold text-sm"
            placeholder="input placeholder"
            defaultValue="firstName"
          />
        </Form.Item>
        <Form.Item key="phoneNo" label="Phone No" className="w-auto">
          <Input
            className="text-bold text-sm"
            placeholder="input placeholder"
            defaultValue="phoneNo"
          />
        </Form.Item>
        <Form.Item key="userRole" label="User Role" className="w-auto">
          <Select
            defaultValue="customer"
            style={{ width: 120 }}
            onChange={handleUserRoleChange}
            options={[
              { value: "customer", label: "Customer" },
              { value: "admin", label: "Admin" },
              { value: "manager", label: "Manager" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}
          />
        </Form.Item>
        <Form.Item key="createdDate" label="Created Date" className="w-auto">
          <DatePicker onChange={handleCreatedDateChange} />
        </Form.Item>
        <Form.Item key="total" label="Total" className="flex flex-row gap-2 w-auto">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Form>
      <div className="flex flex-row w-full justify-end items-center gap-2">
            <Button className="bg-blue-400 text-black font-medium px-4" size="small" onClick={props.onSearchClick}>Search</Button>
            <Button type="default" className="bg-gray-400 text-white font-medium px-4" size="small" onClick={props.onCancelClick}>Cancel</Button>
      </div>
    </div>
  );
};

export default UserSearch;
