import React, { useRef, useState } from 'react'
import { useMemo } from "react";
import {
    MaterialReactTable,
    MRT_ActionMenuItem,
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';
import STUDENTS from "./../assets/students.json";
import { Box, Button, Divider, MenuItem, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { downloadExcel } from "react-export-table-to-excel";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import _, { flatten } from 'lodash';

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

  const columnNamesArray = ['id', 'name','email','phone','standard','section','age','date_of_birth','date_of_admission', 'address'];
  const subColumnArray = ['pincode', 'city', 'street', 'state'];
  const expandDataArray = ['id', 'name', 'email', 'phone'];
  const expandData = {
    id: 'ID',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
  };
  const columnNames = {
    id: 'ID',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    standard: 'Class Name',
    section: 'Section Name',
    age: 'Age',
    date_of_birth: 'DOB',
    date_of_admission: 'DOA',  
    address: {
      pincode: 'Pin Code',
      city: 'City Name',
      street: 'Street Name',
      state: 'State Name',
    }
  } as const;

const MatTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const data: Student[] = STUDENTS;

  /* const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
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
*/
 
  // set columns dynamically   
  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () =>
      data.length
    ? Object.keys(data[0])
    .filter((columnId) => columnNamesArray.includes(columnId))
      .flatMap((columnId: any) => {
        if (typeof columnNames[columnId as keyof Student] === 'object') {
          return Object.keys(columnNames[columnId as keyof Student])
          .filter((subColumnId) => subColumnArray.includes(subColumnId))
          .map((subColumnId) => ({
            header: (columnNames[columnId as keyof Student] as any)[subColumnId as keyof (typeof columnNames)[keyof typeof columnNames]],
            accessorKey: `${columnId}.${subColumnId}`,
            id: `${columnId}.${subColumnId}`,
          }));
        }
        return {
          header: _.capitalize(_.lowerCase(columnId.split(".").pop())),
          accessorKey: columnId,
          id: columnId,
        };
      })
    : [],
    [data],
  );

 
    const handleExportRows = (rows: any) => {
      const tableData = rows.map((row:any) =>
        columns.map((column) => _.get(row.original, column.accessorKey ?? ''))
      );
      const tableHeaders = columns.map((c) => c.header);
  
      downloadExcel({
        fileName: "table-data-to-excel",
        sheet: "table-data-to-excel",
        tablePayload: {
          header: tableHeaders,
          // accept two different data structures
          body: tableData,
        },
      });
    };

  const table = useMaterialReactTable({
    columns,
    data, 
    initialState: { 
      density: 'compact', 
      columnPinning: { left: ['name'], right: ['mrt-row-actions'] }, //make columns fixed
    },
    defaultColumn: {
        maxSize: 400,
        minSize: 80,
        size: 160, //default size is usually 180
      },
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: 'onChange', //default
    columnResizeDirection: 'rtl',
    enableBatchRowSelection: true,
    enableRowVirtualization: true,
    rowVirtualizerOptions: { overscan: 5 },
    state:{ isLoading: isLoading },
    enableColumnOrdering: true,
    muiCircularProgressProps: {
        color: 'secondary',
        thickness: 5,
        size: 55,
    },
    muiTableBodyCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: 'normal',
        fontSize: '12px',
      },
    },
    enableFullScreenToggle: true,
    enableStickyHeader: true,
    muiTableContainerProps:{ sx: { maxHeight: '500px' } },
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1000 : undefined,
        top: table.getState().isFullScreen ? '200px' : 0
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
           onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
      </Box>
    ),
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255,210,244,0.1)'
            : 'rgba(0,0,0,0.1)',
        color: theme.palette.text.secondary,
      }),
    }),
    //custom expand button rotation
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    //conditionally render detail panel
    renderDetailPanel: ({ row }) =>
      row.original.address ? (
        <Box
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
          }}
        >
          {
            Object.keys(row.original)
            .filter((itemId) => expandDataArray.includes(itemId))
            .map((itemId: string) => (
              <Typography key={itemId}>{expandData[itemId as keyof typeof expandData]}: {(row.original as any)[itemId]}</Typography>
            ))
          }
        </Box>
      ) : null,
      // enable Cell Actions
      enableClickToCopy: "context-menu",
      enableEditing : true,
      editDisplayMode: 'cell',
      enableCellActions: true,
      renderCellActionMenuItems: ({ 
        closeMenu,
        cell,
        row,
        table,
        internalMenuItems,
      }) => [
        ...internalMenuItems, //render the copy and edit actions wherever you want in the list
        <Divider />,
        <MRT_ActionMenuItem //or just use the normal MUI MenuItem
          icon={<EmailIcon />}
          key={1}
          label="Send Email"
          onClick={() => {
            //your logic here
            alert("Email sent to " + row.original.email);
            closeMenu(); //close the menu after the action is performed
          }}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<FileDownloadIcon />}
          key={2}
          label="Download"
          onClick={async () => {
            //await your logic here
            alert("item downloaded");
            closeMenu(); //close the menu after the async action is performed
          }}
          table={table}
        />,
      ],
      //row actions
      enableRowActions: true,
      renderRowActionMenuItems: ({ table }) => [ 
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<EditIcon />}
          key="edit"
          label="Edit"
          onClick={() => alert("You can edit this row")}
          table={table}        
        />,  
      ],
      displayColumnDefOptions: {
        "mrt-row-actions": {
          header: "Admin Actions", //change header text
          size: 160, //change column size
        },
      },
  });

  return (
  <>
  <div className='flex flex-col justify-center items-center w-auto gap-4'>
  <h1 className='text-4xl'>Material React Table</h1>
  <Button className='flex w-48 mb-16' variant="contained" color="primary" onClick={() => setIsLoading(false)}>Load Data</Button>
  </div>
  <Paper className='flex flex-col justify-center p-4 m-16'>
  <MaterialReactTable
    table={table} />
  </Paper>
  </>
  );
}

export default MatTable
