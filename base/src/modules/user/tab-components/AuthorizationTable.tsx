import { useMemo, useState } from "react";
import AUTHORIZATION from "../../../assets/authorization.json";
import { useNavigate } from "react-router-dom";
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
type Authorization = {
  id: number;
  description: string;
  accessLevel: string;
};

const expandDataArray = ["accessLevel", "description"];
const expandData = {
  accessLevel: "Access Level",
  description: "Description",
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const AuthorizationTable = () => {
  const [changeEditingMode, setchangeEditingMode] =
    useState<editingModeProps>("cell");
  const [data, setData] = useState<Authorization[]>(AUTHORIZATION);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  //keep track of rows that have been edited
  const [editedAuthorizations, setEditedAuthorizations] = useState<Record<string, Authorization>>({});

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

  const columns = useMemo<MRT_ColumnDef<Authorization>[]>(
    () => [
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
        Cell: ({ row }: {row:any}) => (
          <a href='http://localhost:3000' target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
            {row.original.description}
          </a>
        ),
      },
      {
        accessorKey: "accessLevel",
        header: "Access Level",
        size: 220,
        muiEditTextFieldProps: ({ cell, row }) => ({
          required: true,
          error: !!validationErrors?.accessLevel,
          helperText: validationErrors?.accessLevel,
          //remove any previous validation errors when accessLevel focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              accessLevel: undefined,
            }),
          //store edited accessLevel in state to be saved later
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
            setEditedAuthorizations({ ...editedAuthorizations, [row.id]: row.original });
            console.log("set edittt", editedAuthorizations);
          },
        }),
        Cell: ({ row }: {row:any}) => (
          <p className="text-gray-500">
            {row.original.accessLevel}
          </p>
        ),
      }
    ],
    [validationErrors]
  );

  const handleSave = ({ row, values }: { row: any; values: Authorization }) => {
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
  const handleSaveAuthorizations = () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    console.log("editedAuthorizations", editedAuthorizations);

    Object.values(editedAuthorizations)?.map((std: Authorization) => {
      const newUser = data.find((u) => u.id === std.id);
      return newUser ? newUser : std;
    }),
      setEditedAuthorizations({});
  };

  // Custom toolbar with multiple buttons
  const renderAuthorizationsToolbar = ({ table }: { table: any }) => (
    <TopToolbar>
      <IconButton
        size="small"
        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
      >
        <FileDownloadIcon />
      </IconButton>
      <IconButton size="small" onClick={handleSaveAuthorizations}>
        <SaveIcon />
      </IconButton>
      <IconButton 
      size="small" 
      onClick={()=>{
        const selectedIds = table.getSelectedRowModel().rows.map((row: { original: Authorization }) => row.original.id);
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
  const renderAuthorizationsDetails = ({ row }: { row: any }) =>
    row.original.Authorization ? (
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
      changeEditingMode={changeEditingMode}
      onEditingRowSave={handleSave}
      onEditingRowCancel={() => {
        setValidationErrors({});
        setchangeEditingMode("cell");
      }}
      renderTopToolbarCustomActions={renderAuthorizationsToolbar}
      renderDetailPanel={renderAuthorizationsDetails}
      customRowHeight={getRowHeight}
      renderCellActionMenuItems={renderCellActions}
    />
  );
};

const validateRequired = (value: string) => !!value.length;
export default AuthorizationTable;
