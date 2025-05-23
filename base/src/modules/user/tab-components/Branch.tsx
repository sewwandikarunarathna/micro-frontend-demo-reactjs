import { useMemo, useState } from "react";
import BRANCHES from "../../../assets/branches.json";
import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef, MRT_DensityState, MRT_Row } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import { Divider, IconButton, Typography } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EmailIcon from "@mui/icons-material/Email";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";
import SharedTable from "../../../shared-components/organisms/SharedTable/index.ts";
import TopToolbar from "../../../shared-components/molecules/sharedTableItems/TopToolbar.tsx/TopToolbar.tsx";
import DetailPanel from "../../../shared-components/molecules/sharedTableItems/DetailPanel.tsx/DetailPanel.tsx";
import CellActionMenuItems from "../../../shared-components/molecules/sharedTableItems/CellActionMenuItems.tsx/CellActionMenuItems.tsx";
import SharedCheckbox from "../../../shared-components/atoms/SharedCheckbox/SharedCheckbox.tsx";

//data type
type Branch = {
  id: number;
  branch: string;
        description: string;
        default: boolean;
};

const expandDataArray = ["branch", "description"];
const expandData = {
  branch: "Branch",
  description: "Description",
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const Branch = () => {
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
        accessorKey: "branch",
        header: "Branch",
        size: 220,
        // muiTableBodyCellEditTextFieldProps: { autoFocus: true }, // Always editable
        muiEditTextFieldProps: ({ cell, row }) => ({
          // type: "link",
          required: true,
          error: !!validationErrors?.branch,
          helperText: validationErrors?.branch,
          //remove any previous validation errors when branch focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              branch: undefined,
            }),
          //store edited branch in state to be saved later
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
          //remove any previous validation errors when branch focuses on the input
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
  const handleSaveBranches = () => {
    if (Object.values(validationErrors).some((error) => !!error)) return;
    console.log("editedBranches", editedBranches);

    // await updateBranches(Object.values(editedBranches));
    Object.values(editedBranches)?.map((std: Branch) => {
      const newBranch = data.find((u) => u.id === std.id);
      return newBranch ? newBranch : std;
    }),
      setEditedBranches({});
  };

  // Custom toolbar with multiple buttons
  const renderBranchToolbar = ({ table }: { table: any }) => (
    <TopToolbar>
      <IconButton
        size="small"
        onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
      >
        <FileDownloadIcon />
      </IconButton>
      <IconButton size="small" onClick={handleSaveBranches}>
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
  const renderBranchDetails = ({ row }: { row: any }) =>
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
      renderTopToolbarCustomActions={renderBranchToolbar}
      renderDetailPanel={renderBranchDetails}
      customRowHeight={getRowHeight}
      renderCellActionMenuItems={renderCellActions}
    />
  );
};

const validateRequired = (value: string) => !!value.length;
export default Branch;
