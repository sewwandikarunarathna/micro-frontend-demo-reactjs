import React, { useEffect, useState } from "react";
import {
  Form,
  MenuProps,
  Tabs,
  TabsProps,
} from "antd";

import { TextField, Button, Box, Typography } from '@mui/material';

import STUDENTS from "../../assets/students.json";
import ActionButtonBar from "../../shared-components/templates/ActionButtonBar";
import UserGroup from "../../modules/user/tab-components/UserGroup";
import Country from "../system-enablement/Country"
const CompanyLayout = () => {
  const [siderWidth, setSiderWidth] = useState(200); // Initial width of the Sider
  const [userData, setUserData] = useState<MenuProps["items"]>([
    { key: "1", label: "John Doe" },
  ]);
  const [currentUser, setCurrentUser] = useState<any>({
    userName: "",
    email: "N/A",
    firstName: "N/A",
    lastName: "N/A",
    phone: "N/A",
    status: "",
  });

  const [form] = Form.useForm();

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "User Groups",
      children: <UserGroup />,
    },
   
  ];

   const [formData, setFormData] = useState({
      name: '',
      email: '',
    });
  
    const [errors, setErrors] = useState({
      name: '',
      email: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      // Simple validation
      if (value.trim() === '') {
        setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Check for errors before submit
      let hasError = false;
      const newErrors = {};
  
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        hasError = true;
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        hasError = true;
      }
  
      setErrors(newErrors);
  
      if (!hasError) {
        console.log('Form Submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '' });
      }
    };

  useEffect(()=>{
   
  }, [userData, form]);
const searchSingleUser = () => {
    const filteredStudents = STUDENTS.filter((std) => std.age == 13);
    //set first user as current user in the form
    setCurrentUser({
      userName: filteredStudents[0].name,
      email: filteredStudents[0].email,
      firstName: "N/A",
      lastName: "N/A",
      phoneNo: filteredStudents[0].phone,
      status: "Active",
    });
    setUserData(
      filteredStudents.map((user: any, index) => ({
        key: index + 1,
        label: user.name,
        onClick: () => {         
          setCurrentUser({
            userName: user.name,
            email: user.email,
            firstName: "N/A",
            lastName: "N/A",
            phoneNo: user.phone,
            status: "Active",
          });
        },
      }))
    );
   
  };
  let isMoving = false;
  let lastX = 0;
  const handleMouseDown = (e: any) => {
    console.log("mouse down");
    isMoving = true;
    lastX = e.clientX;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMoving) return;

      const deltaX = e.clientX - lastX;
      setSiderWidth((width) => {
        const newWidth = width + deltaX;

        // Enforce min and max width
        if (newWidth < 180) {
          console.log("Reached minimum width");
          return 200;
        }
        if (newWidth > 400) {
          console.log("Reached maximum width");
          return 400;
        }

        console.log(`width: ${newWidth}, delta: ${deltaX}`);
        return newWidth;
      });

      lastX = e.clientX;
    };

    const handleMouseUp = () => {
      console.log("mouse up");
      isMoving = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // Attach event listeners for mousemove and mouseup
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const onChangeTab = (key: string) => {
    console.log(key);
  };
  return (
    <>
      {/* Action Buttons Bar */}
      <div className="h-12 w-full bg-red-100 border-b flex items-center justify-center px-4 gap-8">
        <ActionButtonBar onSearchClick={searchSingleUser} />
      </div>
      <div className="flex-1 flex flex-row w-full bg-gray-50">
        
        {/* Main Content */}
        <div className="flex flex-col w-full justify-start items-start p-4 gap-6">
          <div className="flex flex-row w-full h-13 justify-between items-start my-3">
            {/* User Panel */}
            <div className="flex flex-col justify-start w-auto">
  <h1 className="font-bold text-3xl" style={{ color: '#091A7C' }}>Country</h1>
</div>

          </div>
          {/* Tabs section */}
          <div className="flex flex-row w-full justify-start items-center">
          <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 5,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Material UI Form
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyLayout;
