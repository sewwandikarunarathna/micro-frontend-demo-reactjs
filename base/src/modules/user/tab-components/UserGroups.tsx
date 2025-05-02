import { useMemo, useState } from "react";
import USERGROUPS from "../../../assets/userGroups.json";
import { useNavigate } from "react-router-dom";
import { usStates } from "../../../assets/makeData.ts";
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
import SharedTable from "../../../shared-components/organisms/SharedTable/index.ts";
import TopToolbar from "../../../shared-components/molecules/sharedTableItems/TopToolbar.tsx/TopToolbar.tsx";
import DetailPanel from "../../../shared-components/molecules/sharedTableItems/DetailPanel.tsx/DetailPanel.tsx";
import CellActionMenuItems from "../../../shared-components/molecules/sharedTableItems/CellActionMenuItems.tsx/CellActionMenuItems.tsx";
import RowActions from "../../../shared-components/molecules/sharedTableItems/RowActions.tsx/RowActions.tsx";

//data type
type UserGroup = {
  id: number;
  userGroup: string;
        description: string;
        default: boolean;
};

const expandDataArray = ["id", "name", "email", "phone"];
const expandData = {
  id: "ID",
  name: "Name",
  email: "Email",
  phone: "Phone",
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const UserGroups = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [changeEditingMode, setchangeEditingMode] =
    useState<editingModeProps>("cell");
  const [data, setData] = useState<UserGroup[]>(USERGROUPS);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedUserGroups, setEditedUserGroups] = useState<Record<string, UserGroup>>({});

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

  const columns = useMemo<MRT_ColumnDef<UserGroup>[]>(
    () => [
      {
        accessorKey: "userGroup",
        header: "userGroup",
        size: 160,
        muiTableBodyCellEditTextFieldProps: { autoFocus: true }, // Always editable
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "link",
          required: true,
          error: !!validationErrors?.userGroup,
          helperText: validationErrors?.userGroup,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              userGroup: undefined,
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
            setEditedUserGroups({ ...editedUserGroups, [row.id]: row.original });
            console.log("set edittt", editedUserGroups);
          },
          // Cell: ({ row }) => (
          //   <a href='http://localhost:3000' target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
          //     {row.original.userGroup}
          //   </a>
          // ),
        }),
      },
      {
        accessorKey: "description",
        header: "description Address",
        size: 150,
        // muiTableBodyCellEditTextFieldProps: { type: "email" }, // Always editable
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.description,
          helperText: validationErrors?.description,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              description: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  const handleSave = ({ row, values }: { row: any; values: UserGroup }) => {
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
    console.log("editedUserGroups", editedUserGroups);

    // await updateUsers(Object.values(editedUserGroups));
    Object.values(editedUserGroups)?.map((std: UserGroup) => {
      const newUser = data.find((u) => u.id === std.id);
      return newUser ? newUser : std;
    }),
      setEditedUserGroups({});
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
        const selectedIds = table.getSelectedRowModel().rows.map((row: { original: UserGroup }) => row.original.id);
        setData(prevData => prevData.filter(row => !selectedIds.includes(row.id)));
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
      displayColumnDefOptions={{
          header: "Actions", //change header text
          size: 120, //change column size
      }}
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
export default UserGroups;
