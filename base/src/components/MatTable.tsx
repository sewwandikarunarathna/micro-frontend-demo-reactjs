import React, { useRef, useState } from 'react'
import { useMemo } from "react";
import {
    MaterialReactTable,
    MRT_ActionMenuItem,
    MRT_ColumnFiltersState,
    MRT_PaginationState,
    MRT_SortingState,
    MRT_TableOptions,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_Cell,
    type MRT_TableInstance
  } from 'material-react-table';
import STUDENTS from "./../assets/students.json";
import { Box, Button, CircularProgress, Divider, IconButton, MenuItem, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { downloadExcel } from "react-export-table-to-excel";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/ViewListRounded';
import CancelEditIcon from '@mui/icons-material/EditOff';
import _, { flatten } from 'lodash';
import { usStates } from '../assets/makeData';
import { type Cell, type Table } from '@tanstack/react-table';
import { Outlet, useNavigate } from 'react-router-dom';
import withAuth from '../utils/WithAuth';

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

  type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";
  
const MatTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [changeEditingMode, setchangeEditingMode] = useState<editingModeProps>('cell');
  const [data, setData] = useState<Student[]>(STUDENTS);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, Student>>({});

  const navigate = useNavigate();

  // const data: Student[] = STUDENTS;

  const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
      {
        accessorKey: "name",
        header: "Full Name",
        size: 150,
        muiTableBodyCellEditTextFieldProps: { autoFocus: true }, // Always editable
        muiEditTextFieldProps: ({ cell, row }) =>({
          type: 'link',
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //store edited user in state to be saved later
          onBlur: (event) => {
            console.log('row', row);
            console.log('eventt', event);
            
            const validationError = !validateRequired(event.currentTarget.value)
              ? 'Required'
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
            console.log('set edittt', editedUsers);

          },
          // Cell: ({ row }) => (
          //   <a href='http://localhost:3000' target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
          //     {row.original.name}
          //   </a>
          // ),
        })
    },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 150,
        muiTableBodyCellEditTextFieldProps: { type: "email" }, // Always editable
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        size: 150,
        muiTableBodyCellEditTextFieldProps: { type: "number" }, // Always editable
      },
      {
        accessorKey: "standard",
        header: "Class Name",
        size: 150,
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
        muiEditTextFieldProps: {
          type: 'number',
          required: true,
          error: !!validationErrors?.pincode,
          helperText: validationErrors?.pincode,
        },
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
        editVariant: 'select',
        editSelectOptions: usStates, 
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) =>
            console.log('statett', row)
            
            // setEditedUsers({
            //   ...editedUsers,
            //   [row.id]: { ...row.original, state: event.target.value },
            // }),
        }),
      },
    ], [validationErrors]);

 
  // set columns dynamically   
  /*const columns = useMemo<MRT_ColumnDef<Student>[]>(
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
            // editVariant: 'select',
            // editSelectOptions: subColumnId == 'state' ? usStates: [],
            // muiEditTextFieldProps: subColumnId == 'state' ? {
            //   select: true,
            //   error: !!validationErrors?.state,
            //   helperText: validationErrors?.state,
            // } : {},
          }));
        }
        return {
          header: _.capitalize(_.lowerCase(columnId.split(".").pop())),
          accessorKey: columnId,
          id: columnId,
          enableEditing: columnId == 'id' ? false : true,
          muiEditTextFieldProps: {
            type: columnId == 'email' ? 'email' : 'text',
            required: true,
            error: !!validationErrors[columnId],
            helperText: validationErrors[columnId],
            //remove any previous validation errors when user focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                columnId: undefined,
              }),
          },
        };
      })
    : [],
    [data, validationErrors],
  ); */

  const handleSave = ({ row, values }: { row: any, values: Student }) => {
    console.log('updatedData', values);
    const updatedData = [...data];
    updatedData[row.index] = values; // Update row data
    console.log(updatedData);
    
    setData(updatedData);
  };

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

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Student>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    //update the existing row with new values
    const rowIndex = data.findIndex((row) => row.id === values.id);
    if (rowIndex !== -1) {
      // Create a new array with the updated row
      const updatedData = [...data];
      updatedData[rowIndex] = { ...data[rowIndex], ...values };
      setData(updatedData);
    }
    
    table.setEditingRow(null); //exit editing mode
    setchangeEditingMode('cell');
  };

  //edit cell
  const handleSaveCell = (cell: { row: { index: number }; column: { id: keyof Student } }, value: any) => {
    const updatedData = [...data];
    (updatedData[cell.row.index] as any)[cell.column.id] = value; // Update the specific cell value
    setData(updatedData); // Update state with new data
  };

  //UPDATE action
  const handleSaveUsers = () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    console.log('editedUsers', editedUsers);
    
    // await updateUsers(Object.values(editedUsers));
    Object.values(editedUsers)?.map((std: Student) => {
      const newUser = data.find((u) => u.id === std.id);
      return newUser ? newUser : std;
    }),
    setEditedUsers({});
  };

  // console.log('editedusersss', Object.keys(editedUsers).length);
  // console.log('validate errsssss', Object.values(validationErrors));

  const table = useMaterialReactTable({
    columns,
    data, 
    initialState: { 
      density: 'compact', 
      columnPinning: { left: ['name'], right: ['mrt-row-actions'] }, //make columns fixed
    },
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: 'onChange', //default
    columnResizeDirection: 'rtl',
    enableBatchRowSelection: true,
    enableRowVirtualization: true,
    enableRowSelection: true,
    rowVirtualizerOptions: { overscan: 5 },
    state:{ isLoading: isLoading },
    enableColumnOrdering: true,
    muiCircularProgressProps: {
        color: 'secondary',
        thickness: 5,
        size: 55,
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
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveUsers}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          Save
          {/* {isUpdatingUsers ? <CircularProgress size={25} /> : 'Save'} */}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
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
      editDisplayMode: changeEditingMode,
      enableCellActions: true,
      //optionally, use single-click to activate editing mode instead of default double-click
    muiTableBodyCellProps: ({ cell, column, table }) => ({
      onFocus: () => {
        if(cell.column.columnDef.editVariant === 'select') {
          return;
        }
        table.setEditingCell(cell); //set editing cell
        //optionally, focus the text field
        queueMicrotask(() => {
          const textField = table.refs.editInputRefs.current?.[column.id];
          if (textField) {
            textField.focus();
            textField.select?.();
          }
        });
      },
      // onKeyDown: (event) => {
      //   if (event.key === 'Enter') {
      //     table.setEditingCell(cell);
      //     queueMicrotask(() => {
      //       const textField = table.refs.editInputRefs.current?.[column.id];
      //       if (textField) {
      //         textField.focus();
      //         textField.select?.();
      //       }
      //     });
      //   }
      // },
     //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        fontWeight: 'normal',
        fontSize: '12px',
        '&:focus-visible': {
          //or just `&:focus` if you want all focus events to be visible
          outline: '2px solid red',
          outlineOffset: '-2px',
        },
      },
    }),
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
      // onCellEditChange: ({ cell, value }) => handleSaveCell(cell, value), // Save edited value
      //row actions
      enableRowActions: true,
      onEditingRowSave: handleSave,
      // onEditingCellChange: ({ cell, value }) => handleSaveCell(cell, value),
      onEditingRowCancel: () => {
        setValidationErrors({});
        setchangeEditingMode('cell');
      },
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <IconButton
            color="primary"
            onClick={() =>
              window.open(
                `mailto:${row.original.email}?subject=Hello ${row.original.name}!`,
              )
            }
          >
            <EmailIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => {
              setchangeEditingMode('row');
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
          {/* <IconButton
            color="error"
            onClick={() => {
              window.confirm('Are you sure you want to delete this row?').valueOf() &&
              data.splice(row.index, 1); //assuming simple data table
              setData([...data]);
            }}
          >
            <DeleteIcon />
          </IconButton> */}
          <IconButton
            color="secondary"
            onClick={() => {
              console.log('iddddddddd',row.original);
              
              navigate(`row/${row.id}`, { state: { data: row.original } })
            }}
          >
            <ViewIcon />
          </IconButton>
        </Box>
      ),
      displayColumnDefOptions: {
        "mrt-row-actions": {
          header: "Admin Actions", //change header text
          size: 220, //change column size
        },
      },
     //add custom keyboard shortcuts
    defaultColumn: {
      maxSize: 400,
      minSize: 80,
      size: 160, //default size is usually 180
      //header
      muiTableHeadCellProps: {
        onKeyDown: (event) => {
          if (event.key === 'enter' && event.metaKey) {
            alert('You pressed the custom shortcut!');
          }
        },
        tabIndex: 0, //allow for keyboard focus
      },
      //body
      // muiTableBodyCellProps: {
      //   // onKeyDown: (event) => {
      //   //   if (event.key === 'Enter') {
      //   //     alert('You pressed the custom shortcut!');
      //   //   }
      //   // },
      //   //add custom focus styles
      //   sx: {
      //     
      //   },
      //   tabIndex: 0, //allow for keyboard focus
      // },
    },
    // enableKeyboardShortcuts: false, 
  });


  return (
  <>
  <div className='flex flex-col justify-center items-center w-auto gap-4'>
  <h1 className='text-4xl'>Material React Table</h1>
  <Button className='flex w-48 mb-16' variant="contained" color="primary" onClick={() => setIsLoading(false)}>Load Data</Button>
  </div>
  <Outlet /> 
  <Paper className='flex flex-col justify-center p-4 m-16'>
  <MaterialReactTable
    table={table} />
  </Paper>
  </>
  );
}

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
function validateUser(user: Student) {
  return {
    name: !validateRequired(user.name)
      ? 'Full Name is Required'
      : '',
    email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}

export default withAuth(MatTable)
