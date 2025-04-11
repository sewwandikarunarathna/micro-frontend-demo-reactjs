"use client";
import { Form, Input, Button, Alert } from "antd";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

async function addToCart(prevState:any, queryData:any) {
    const itemID = queryData.get('itemID');
    if (itemID === "1") {
      return "Added to cart";
    } else {
      // Add a fake delay to make waiting noticeable.
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
      return "Couldn't add to cart: the item is sold out.";
    }
  }
function AddToCartForm({itemID, itemTitle}: { itemID: string; itemTitle: string }) {
    const [message, formAction, isPending] = useActionState(addToCart, null);
    return (
      <form action={formAction}>
        <h2>{itemTitle}</h2>
        <input type="hidden" name="itemID" value={itemID} />
        <button type="submit">Add to Cart</button>
        {isPending ? "Loading..." : message}
      </form>
    );
  }

const UserForm = () => {
  const [formErrors, setFormErrors] = useState<any>({});
  const [message, formAction, isPending] = useActionState(addToCart, null);

    const [form] = Form.useForm();
  
//   const [error, submitAction, isPending] = useActionState(
//       async (prevState: any, formData: any) => {
//         console.log("formData", formData);
  
//         const errors: any = {};
//         // Validation logic
//         if (!formData.get("username")) errors.username = "Username is required";
//         if (!formData.get("email")?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
//           errors.email = "Invalid email format";
//         if (!formData.get("firstname"))
//           errors.firstname = "First name is required";
//         if (!formData.get("lastname")) errors.lastname = "Last name is required";
//         const age = parseInt(formData.get("age"), 10);
//         if (!age || age < 18 || age > 120)
//           errors.age = "Age must be between 18 and 120";
  
//         setFormErrors(errors); // Update errors state
//         if (Object.keys(formErrors).length > 0) {
//           return formErrors; // Return validation errors
//         }
  
//         // Simulate server-side processing
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         console.log("Form submitted successfully:", Object.fromEntries(formData));
//         return null; // No errors
//       },
//     {name:'wathsala'}, // Initial state
//   );

  const { pending } = useFormStatus();
//   console.log("error.username", error.username);
  console.log(" from errors", formErrors);
  console.log("pending", pending);
  console.log("is pendifn", isPending);

  function Submit() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
  }

  function Form1({ action }: { action: () => void }) {
    return (
      <form action={action}>
        <Submit />
      </form>
    );
  }

  const submitForm = () => {
    console.log("Form submitted successfully");
    
  }
  return (
    <div className="flex flex-row justify-between items-start gap-3 w-full m-auto p-0">
      <div className="flex justify-start items-start w-full">
        <h2>User Form</h2>
        {formErrors && (
          <Alert
            message="Validation Errors"
            description={Object.values(formErrors).join(", ")}
            type="error"
            showIcon
          />
        )}
        <Form size="small"  layout="vertical">
          <Form.Item          
            style={{ marginBottom: 0 }}
            label="Username"
            name="username"
          >
            <Input type="text" name="username" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0 }}
            label="Email"
            name="email"           
            rules={[
              { type: "email", message: "Email doesn't match with format" },
            ]}
          >
            <Input name="email" type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0 }}
            label="First Name"
            name="firstname"
          >
            <Input name="firstname" placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0 }}
            label="Last Name"
            name="lastname"
          >
            <Input name="lastname" placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }} label="Age" name="age">
            <Input name="age" type="number" placeholder="Enter your age" />
          </Form.Item>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={pending || isPending}
          >
            {pending || isPending ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </div>
      <div className="flex flex-col justify-end items-start w-full">
        {/* <Form1 action={submitForm} />; */}
        <AddToCartForm itemID="1" itemTitle="JavaScript: The Definitive Guide" />
        <AddToCartForm itemID="2" itemTitle="JavaScript: The Good Parts" />
        <Form form={form} action={formAction}>
            <Form.Item label="Item ID" name="itemID">
                <input type="text" name="itemID" placeholder="Enter item ID" />
            </Form.Item>
                <button  className="bg-green-500 text-white px-4 py-2 rounded" type="submit" disabled={isPending}>
                Add to Cart
                </button>
                {isPending ? "Loading..." : message}
        </Form>
        {/* <form action={formAction}>
        <h2>title: ssss</h2>
        <input type="text" name="itemID" />
        <button type="submit">Add to Cart</button>
        {isPending ? "Loading..." : message} */}
      {/* </form> */}
      </div>
    </div>
  );
};

export default UserForm;
