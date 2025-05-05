import { useMemo, useState } from "react";
import STUDENTS from "../../../assets/students.json";
import { useNavigate } from "react-router-dom";
import { usStates } from "../../../assets/makeData";
import { MRT_ColumnDef, MRT_DensityState } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import { Divider, IconButton, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/ViewListRounded";
import _ from "lodash";
import SharedTable from "../../../shared-components/organisms/SharedTable";
import TopToolbar from "../../../shared-components/molecules/sharedTableItems/TopToolbar.tsx/TopToolbar.tsx";
import DetailPanel from "../../../shared-components/molecules/sharedTableItems/DetailPanel.tsx/DetailPanel.tsx";
import CellActionMenuItems from "../../../shared-components/molecules/sharedTableItems/CellActionMenuItems.tsx/CellActionMenuItems.tsx";
import RowActions from "../../../shared-components/molecules/sharedTableItems/RowActions.tsx/RowActions.tsx";

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

  const cellMenuItems = ({ row }: { row: any }, closeMenu: any) => [
    {
      key: 1,
      label: "Send Email",
      icon: <EmailIcon />,
      onClick: () => {
        alert("Email sent to " + row.original.email);
        closeMenu(); //close the menu after the action is performed
      },
    },
    {
      key: 2,
      label: "Download",
      icon: <FileDownloadIcon />,
      onClick: async () => {
        //await your logic here
        alert("item downloaded");
        closeMenu(); //close the menu after the async action is performed
      },
    },
  ];

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
        size: 120,
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
        size: 100,
        muiTableBodyCellEditTextFieldProps: { type: "number" }, // Always editable
      },
      {
        accessorKey: "standard",
        header: "Class Name",
        size: 100,
      },
      {
        accessorKey: "section",
        header: "Section Name",
        size: 120,
      },
      {
        accessorKey: "age",
        header: "Age",
        size: 100,
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
        size: 120,
      },
      {
        accessorKey: "address.city",
        header: "City Name",
        size: 120,
      },
      {
        accessorKey: "address.street",
        header: "Street Name",
        size: 120,
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
    console.log("rows", rows);

    const tableData = rows?.map((row: any) =>
      columns?.map((column) => _?.get(row?.original, column.accessorKey ?? ""))
    );
    const tableHeaders = columns?.map((c) => c.header);

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

  // Custom toolbar with multiple buttons
  const renderUserToolbar = ({ table }: { table: any }) => (
    <TopToolbar>
      <IconButton
        size="small"
        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
      >
        <FileDownloadIcon />
      </IconButton>
      <IconButton size="small" onClick={handleSaveUsers}>
        <SaveIcon />
      </IconButton>
      <IconButton 
      size="small" 
      // disabled={selectedRowIds.length === 0} 
      onClick={()=>{
        const selectedIds = table.getSelectedRowModel().rows.map((row: { original: Student }) => row.original.email);
        setData(prevData => prevData.filter(row => !selectedIds.includes(row.email)));
        table.resetRowSelection(); // Reset selection after deletion
        }}>
        <DeleteIcon />
      </IconButton>
      {Object.values(validationErrors).some((error) => !!error) && (
        <Typography className="text-sm" color="error">
          Fix errors before submitting
        </Typography>
      )}
    </TopToolbar>
  );

  // Detail panel renderer
  const renderUserDetails = ({ row }: { row: any }) =>
    row.original.address ? (
      <DetailPanel>
        {Object.keys(row.original)
          .filter((itemId) => expandDataArray.includes(itemId))
          .map((itemId: string) => (
            <Typography key={itemId}>
              {expandData[itemId as keyof typeof expandData]}:{" "}
              {(row.original as any)[itemId]}
            </Typography>
          ))}
      </DetailPanel>
    ) : null;

  // Cell Action Menu Items renderer
  const renderCellActions = ({
    closeMenu,
    cell,
    row,
    table,
    internalMenuItems,
  }: {
    closeMenu: any;
    cell: any;
    row: any;
    table: any;
    internalMenuItems: any;
  }) => [
    ...internalMenuItems, //render the copy and edit actions wherever you want in the list
    <Divider />,
    <CellActionMenuItems
      menuItems={cellMenuItems({ row }, closeMenu)}
      table={table}
    />,
  ];

  //render row actions
  const renderRowActions = ({ row, table }: { row: any; table: any }) => {
    const rowActionButtons = [
      {
        color: "primary",
        onClick: () =>
          window.open(
            `mailto:${row.original.email}?subject=Hello ${row.original.name}!`
          ),
        icon: <EmailIcon />,
      },
      {
        color: "secondary",
        onClick: () => {
          setchangeEditingMode("row");
          table.setEditingRow(row);
        },
        icon: <EditIcon />,
      },
      {
        color: "secondary",
        onClick: () => {
          navigate(`row/${row.id}`, { state: { data: row.original } });
        },
        icon: <ViewIcon />,
      },
    ];

    return <RowActions rowActionButtons={rowActionButtons} />;
  };

  const getRowHeight = (density: MRT_DensityState) => {
    switch (density) {
      case "compact":
        return { maxHeight: "24px" };
      case "comfortable":
        return { maxHeight: "30px" };
      case "spacious":
        return { maxHeight: "52px" };
      default:
        return { maxHeight: "24px" };
    }
  };

  return (
    <SharedTable
      columns={columns}
      data={data}
      tableDensity="compact"
      leftColumnPinning={["name"]}
      rightColumnPinning={["mrt-row-actions"]}
      changeEditingMode={changeEditingMode}
      onEditingRowSave={handleSave}
      onEditingRowCancel={() => {
        setValidationErrors({});
        setchangeEditingMode("cell");
      }}
      renderTopToolbarCustomActions={renderUserToolbar}
      renderDetailPanel={renderUserDetails}
      customRowHeight={getRowHeight}
      renderCellActionMenuItems={renderCellActions}
      enableRowActions
      renderRowActions={renderRowActions}
    />
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
