import { useMemo, useState } from "react";
import BRANCHES from "../../../assets/branches.json";
import { useNavigate } from "react-router-dom";
import { usStates } from "../../../assets/makeData.ts";
import { MRT_ColumnDef, MRT_DensityState, MRT_Row } from "material-react-table";
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
import SharedCheckbox from "../../../shared-components/atoms/SharedCheckbox/SharedCheckbox.tsx";

//data type
type Branch = {
  id: number;
  description: string;
  accessLevel: string;
};

const expandDataArray = ["accessLevel", "description"];
const expandData = {
  accessLevel: "User Group",
  description: "Description",
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const AuthorizationTable = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [changeEditingMode, setchangeEditingMode] =
    useState<editingModeProps>("cell");
  const [data, setData] = useState<Branch[]>(BRANCHES);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedBranches, setEditedBranches] = useState<Record<string, Branch>>({});

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

  const columns = useMemo<MRT_ColumnDef<Branch>[]>(
    () => [
      {
        accessorKey: "accessLevel",
        header: "User Group",
        size: 220,
        // muiTableBodyCellEditTextFieldProps: { autoFocus: true }, // Always editable
        muiEditTextFieldProps: ({ cell, row }) => ({
          // type: "link",
          required: true,
          error: !!validationErrors?.accessLevel,
          helperText: validationErrors?.accessLevel,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              branch: undefined,
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
            setEditedBranches({ ...editedBranches, [row.id]: row.original });
            console.log("set edittt", editedBranches);
          },
        }),
        Cell: ({ row }: {row:any}) => (
          <a href='http://localhost:3000' target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
            {row.original.branch}
          </a>
        ),
      },
      {
        accessorKey: "description",
        header: "description",
        size: 240,
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
      {
        accessorKey: "default",
        header: "Default",
        size: 160,
        // muiTableBodyCellEditTextFieldProps: { autoFocus: false },
        enableEditing: false, // Disable editing for this column
         // Custom cell rendering with checkbox
         Cell: ({ row }) => (
          <SharedCheckbox
            checked={row.original.default}
            onChange={(e:any) => {e.stopPropagation();handleCheckboxChange(row, e.target.checked);}}
            // onClick={(e:any) => e.stopPropagation()} // Prevent cell click from triggering edit mode
          />
        ),
        // Optional: Hide the default filtering UI for this column
        enableColumnFilter: false,
      },
    ],
    [validationErrors]
  );

  // Handle checkbox changes
  const handleCheckboxChange = (row: MRT_Row<Branch>, checked:boolean) => {
    setData(
      data.map((item) => {
        if (item.id === row.original.id) {
          return { ...item, default: checked };
        }
        return item;
      })
    );
  };

  const handleSave = ({ row, values }: { row: any; values: Branch }) => {
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
    console.log("editedBranches", editedBranches);

    // await updateUsers(Object.values(editedBranches));
    Object.values(editedBranches)?.map((std: Branch) => {
      const newUser = data.find((u) => u.id === std.id);
      return newUser ? newUser : std;
    }),
      setEditedBranches({});
  };

  // Custom toolbar with multiple buttons
  const renderUserGroupToolbar = ({ table }: { table: any }) => (
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
        const selectedIds = table.getSelectedRowModel().rows.map((row: { original: Branch }) => row.original.id);
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
  const renderUserGroupDetails = ({ row }: { row: any }) =>
    row.original.branch ? (
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
      // leftColumnPinning={["name"]}
      // rightColumnPinning={["mrt-row-actions"]}
      // displayColumnDefOptions={{
      //     header: "Actions", //change header text
      //     size: 160, //change column size
      // }}
      changeEditingMode={changeEditingMode}
      onEditingRowSave={handleSave}
      onEditingRowCancel={() => {
        setValidationErrors({});
        setchangeEditingMode("cell");
      }}
      renderTopToolbarCustomActions={renderUserGroupToolbar}
      renderDetailPanel={renderUserGroupDetails}
      customRowHeight={getRowHeight}
      renderCellActionMenuItems={renderCellActions}
      // renderRowActions={renderRowActions}
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
export default AuthorizationTable;
