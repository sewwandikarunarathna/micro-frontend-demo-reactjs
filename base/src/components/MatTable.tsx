import React, { useState } from 'react'
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';

import STUDENTS from "./../assets/students.json";
import { Button } from '@mui/material';

//data type
type Student = {
    id: number;
    name: string;
    email: string;
    phone: string;
    standard: number;
    section: string;
    age: number;
    date_of_birth:string;
    date_of_admission:string;
    address: {
      pincode: string;
      city: string;
      street: string;
      state: string;
    }
  };

const MatTable = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const data: Student[] = STUDENTS;
    //   const data: Student[] =  [
    //     {
    //         id: 1,
    //         name: "Dipali Marar",
    //         email: "Daevika_Gill46@yahoo.co.in",
    //         phone: "+918323331146",
    //         standard: 1,
    //         section: "B",
    //         age: 13,
    //         date_of_birth: "1995-11-17T00:08:59.890Z",
    //         date_of_admission: "2011-10-17T00:40:01.399Z",
    //         address: {
    //           pincode: "714 689",
    //           city: "Richardson",
    //           street: "15353 Mandakini Mill",
    //           state: "Nagaland"
    //         }
    //       },
    //   ];

    const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
        {
          accessorKey: "name",
          header: "Full Name",
          size: 150,
          enableClickToCopy: true,
          enableResizing: false,
        },
        {
          accessorKey: "email",
          header: "Email Address",
          size: 150,
          enableClickToCopy: true,
          enableResizing: true,
        },
        {
          accessorKey: "phone",
          header: "Phone Number",
          size: 150,
          enableClickToCopy: true,
          enableResizing: true,
        },
        {
          accessorKey: "standard",
          header: "Class Name",
          size: 150,
          enableResizing: false,
        },
        {
          accessorKey: "section",
          header: "Section Name",
          size: 150,
        },
        {
          accessorKey: "age",
          header: "Age",
          size: 150,
        },
        {
          accessorKey: "date_of_birth",
          header: "DOB",
          size: 150,
        },
        {
          accessorKey: "date_of_admission",
          header: "DOA",
          size: 150,
        },
        {
          accessorKey: "address.pincode",
          header: "Pin Code",
          size: 150,
        },
        {
          accessorKey: "address.city",
          header: "City Name",
          size: 150,
        },
        {
          accessorKey: "address.street",
          header: "Street Name",
          size: 150,
        },
        {
          accessorKey: "address.state",
          header: "State Name",
          size: 150,
        },
      ], []);

  const table = useMaterialReactTable({
    columns,
    data, 
    defaultColumn: {
        maxSize: 400,
        minSize: 80,
        size: 160, //default size is usually 180
      },
    enableColumnResizing: true,
    columnResizeMode: 'onChange', //default
    columnResizeDirection: 'rtl',
    enableBatchRowSelection: true,
    state:{ isLoading: isLoading },
    muiCircularProgressProps: {
        color: 'secondary',
        thickness: 5,
        size: 55,
    }
  });

  return (
  <>
  <Button variant="contained" color="primary" onClick={() => setIsLoading(false)}>Load Data</Button>
  <MaterialReactTable table={table} />
  </>
  );
}

export default MatTable
