import React, { useMemo, useState } from "react";
import STUDENTS from "../../../assets/students.json";
import { useNavigate } from "react-router-dom";
import { usStates } from "../../../assets/makeData";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/ViewListRounded";
import _, { flatten } from "lodash";

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

const expandDataArray = ["id", "name", "email", "phone"];
const expandData = {
  id: "ID",
  name: "Name",
  email: "Email",
  phone: "Phone",
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const UserGroup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [changeEditingMode, setchangeEditingMode] =
    useState<editingModeProps>("cell");
  const [data, setData] = useState<Student[]>(STUDENTS);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState<Record<string, Student>>({});

  const navigate = useNavigate();

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
        size: 150,
        muiTableBodyCellEditTextFieldProps: { autoFocus: true }, // Always editable
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "link",
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
            console.log("row", row);
            console.log("eventt", event);

            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            setEditedUsers({ ...editedUsers, [row.id]: row.original });
            console.log("set edittt", editedUsers);
          },
          // Cell: ({ row }) => (
          //   <a href='http://localhost:3000' target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
          //     {row.original.name}
          //   </a>
          // ),
        }),
      },
      {
        accessorKey: "email",
        header: "Email Address",
        size: 150,
        muiTableBodyCellEditTextFieldProps: { type: "email" }, // Always editable
        muiEditTextFieldProps: {
          type: "email",
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
          type: "number",
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
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          error: !!validationErrors?.state,
          helperText: validationErrors?.state,
          onChange: (event) => console.log("statett", row),

          // setEditedUsers({
          //   ...editedUsers,
          //   [row.id]: { ...row.original, state: event.target.value },
          // }),
        }),
      },
    ],
    [validationErrors]
  );

  const handleSave = ({ row, values }: { row: any; values: Student }) => {
    console.log("updatedData", values);
    const updatedData = [...data];
    updatedData[row.index] = values; // Update row data
    console.log(updatedData);

    setData(updatedData);
  };

  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((column) => _.get(row.original, column.accessorKey ?? ""))
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
  const handleSaveUsers = () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    console.log("editedUsers", editedUsers);

    // await updateUsers(Object.values(editedUsers));
    Object.values(editedUsers)?.map((std: Student) => {
      const newUser = data.find((u) => u.id === std.id);
      return newUser ? newUser : std;
    }),
      setEditedUsers({});
  };

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      density: "compact",
      columnPinning: { left: ["name"], right: ["mrt-row-actions"] }, //make columns fixed
    },
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: "onChange", //default
    columnResizeDirection: "rtl",
    enableBatchRowSelection: true,
    enableRowVirtualization: true,
    enableRowSelection: true,
    rowVirtualizerOptions: { overscan: 5 },
    state: { isLoading: false }, // isLoading
    enableColumnOrdering: true,
    muiCircularProgressProps: {
      color: "secondary",
      thickness: 5,
      size: 55,
    },
    enableFullScreenToggle: true,
    enableStickyHeader: true,
    muiTableProps: {
        sx: {
          width: "600px",
        },
    },
    muiTopToolbarProps: {
        sx: {
            backgroundColor: "#ECECEE",
            color: "text.secondary",
            position: "sticky",
            top: 0,
            maxHeight: "1000px",
            zIndex: 1000,
        },
    },
    muiTableContainerProps: { sx: { maxHeight: "250px" } },
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1000 : undefined,
        top: table.getState().isFullScreen ? "200px" : 0,
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          padding: "2px",
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        ></Button>
        <Button
          size="small"
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
          theme.palette.mode === "dark"
            ? "rgba(255,210,244,0.1)"
            : "rgba(0,0,0,0.1)",
        color: theme.palette.text.secondary,
      }),
    }),
    //custom expand button rotation
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //only 1 detail panel open at a time
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    //conditionally render detail panel
    renderDetailPanel: ({ row }) =>
      row.original.address ? (
        <Box
          sx={{
            display: "grid",
            margin: "auto",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
          }}
        >
          {Object.keys(row.original)
            .filter((itemId) => expandDataArray.includes(itemId))
            .map((itemId: string) => (
              <Typography key={itemId}>
                {expandData[itemId as keyof typeof expandData]}:{" "}
                {(row.original as any)[itemId]}
              </Typography>
            ))}
        </Box>
      ) : null,
    // enable Cell Actions
    enableClickToCopy: "context-menu",
    enableEditing: true,
    editDisplayMode: changeEditingMode,
    enableCellActions: true,
    //optionally, use single-click to activate editing mode instead of default double-click
    muiTableBodyCellProps: ({ cell, column, table }) => ({
      onFocus: () => {
        if (cell.column.columnDef.editVariant === "select") {
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
        fontWeight: "normal",
        fontSize: "12px",
        "&:focus-visible": {
          //or just `&:focus` if you want all focus events to be visible
          outline: "2px solid red",
          outlineOffset: "-2px",
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
      setchangeEditingMode("cell");
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "8px" }}>
        <IconButton
          size="small"
          color="primary"
          onClick={() =>
            window.open(
              `mailto:${row.original.email}?subject=Hello ${row.original.name}!`
            )
          }
        >
          <EmailIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => {
            setchangeEditingMode("row");
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
            console.log("iddddddddd", row.original);

            navigate(`row/${row.id}`, { state: { data: row.original } });
          }}
        >
          <ViewIcon />
        </IconButton>
      </Box>
    ),
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions", //change header text
        size: 120, //change column size
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
          if (event.key === "enter" && event.metaKey) {
            alert("You pressed the custom shortcut!");
          }
        },
        tabIndex: 0, //allow for keyboard focus
      },
    },
  });
  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
export default UserGroup;
