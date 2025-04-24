import { Layout } from "antd";
import SharedMenu from "../../molecules/SharedMenu";
import { MaterialReactTable, MRT_DensityState, useMaterialReactTable } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import _ from "lodash";
import SharedTableTopToolbar from "../../molecules/sharedTableItems/TopToolbar.tsx/index.ts";
import SharedTableDetailPanel from "../../molecules/sharedTableItems/DetailPanel.tsx/DetailPanel.tsx";
import { Divider } from "@mui/material";
import CellActionMenuItems from "../../molecules/sharedTableItems/CellActionMenuItems.tsx/CellActionMenuItems.tsx";

const { Header } = Layout;

type Props = {
  columns: any;
  data: any;
  isDataLoading: boolean;
  children?: any;
  tableDensity?: MRT_DensityState | undefined;
  leftColumnPinning?: string[];
  rightColumnPinning?: string[];
  tableWidth?: string;
  tableContainerHeight?: string;
  /* renderTopToolbarCustomActions props */
  onExportButtonClick: any;
  onSaveButtonClick: any;
  editedUsers: string[];
  validationErrors: string[];
  /* end */
  detailPanelContent: any;
  changeEditingMode: editingModeProps;
  onEditingRowSave: any;
  onEditingRowCancel: any;
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const SharedTable = (props: Props) => {
  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      props.columns.map((column:any) => _.get(row.original, column.accessorKey ?? ""))
    );
    const tableHeaders = props.columns.map((c:any) => c.header);

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
    columns: props.columns,
    data: props.data,
    initialState: {
      density: props.tableDensity,
      columnPinning: { left: props.leftColumnPinning, right: props.rightColumnPinning }, //make columns fixed
    },
    muiTableHeadRowProps: {
      sx: {
        "& .MuiIconButton-root": {
          // For icon buttons specifically
          padding: "2px",
          "& .MuiSvgIcon-root": {
            fontSize: "1.0rem", // Make icons smaller
          },
        },
        "& .MuiInputBase-root": {
          // For search/filter inputs
          height: "20px",
          fontSize: "0.75rem",
          margin: "2px",
        },
      },
    },
    // Apply height constraints only to regular rows, not expanded ones
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        // Only apply height constraints if the row is NOT expanded
        ...(row.getIsExpanded()
          ? {}
          : {
              maxHeight:
                props.tableDensity === "compact"
                  ? "24px"
                  : props.tableDensity === "spacious"
                  ? "52px"
                  : "30px",
            }),
      },
    }),
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: "onChange", //default
    columnResizeDirection: "rtl",
    enableBatchRowSelection: true,
    enableRowVirtualization: true,
    enableRowSelection: true,
    rowVirtualizerOptions: { overscan: 5 },
    state: { isLoading: props.isDataLoading ?? false }, // isLoading
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
        width: props.tableWidth ?? "600px",
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#ECECEE",
        minHeight: "15px",
        maxHeight: "34px",
        padding: "2px 8px",
        "& .MuiButtonBase-root": {
          // Reduce size of buttons
          padding: "2px 6px",
          minWidth: "unset",
        },
        "& .MuiIconButton-root": {
          // For icon buttons specifically
          padding: "2px",
          "& .MuiSvgIcon-root": {
            fontSize: "1.0rem", // Make icons smaller
          },
        },
        "& .MuiInputBase-root": {
          // For search/filter inputs
          height: "26px",
          fontSize: "0.75rem",
          margin: "2px",
        },
      },
    },
    muiBottomToolbarProps: {
      sx: {
        minHeight: "10px",
        maxHeight: "36px",
        padding: "10px",
        top: 0,
        "& .MuiTypography-root": {
          fontSize: "0.7rem",
        },
        "& .MuiButtonBase-root": {
          // Reduce size of buttons
          padding: "2px 6px",
          minWidth: "unset",
        },
        "& .MuiIconButton-root": {
          // For icon buttons specifically
          padding: "2px",
          "& .MuiSvgIcon-root": {
            fontSize: "1.0rem", // Make icons smaller
          },
        },
        "& .MuiInputBase-root": {
          // For search/filter inputs
          height: "26px",
          fontSize: "0.75rem",
          margin: "2px",
        },
        "& .MuiInputLabel-root": {
          // "Rows per page:" text
          fontSize: "0.75rem",
        },
        "& .MuiMenu-root": {
          // page number list
          fontSize: "0.75rem",
        },
      },
    },
    muiTableContainerProps: { sx: { maxHeight: props.tableContainerHeight ?? "220px" } },
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1000 : undefined,
        top: table.getState().isFullScreen ? "200px" : 0,
      },
    }),
    renderTopToolbarCustomActions: ({ table }) => (
      <SharedTableTopToolbar onExportButtonClick={props.onExportButtonClick} onSaveButtonClick={props.onSaveButtonClick} editedUsers={props.editedUsers} validationErrors={props.validationErrors} />
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
      row.original.address ? ( //remove this condition later
        <SharedTableDetailPanel>
          {props.detailPanelContent}
        </SharedTableDetailPanel>
      ) : null,
    // enable Cell Actions
    enableClickToCopy: "context-menu",
    enableEditing: true,
    editDisplayMode: props.changeEditingMode,
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
      <CellActionMenuItems onEmailButtonClick={() => {
        //your logic here
        alert("Email sent to " + row.original.email);
        closeMenu(); //close the menu after the action is performed
      }} onDownloadButtonClick={async () => {
        //await your logic here
        alert("item downloaded");
        closeMenu(); //close the menu after the async action is performed
      }} table={table} />      
    ],
    //row actions
    enableRowActions: true,
    onEditingRowSave: props.onEditingRowSave,
    // onEditingCellChange: ({ cell, value }) => handleSaveCell(cell, value),
    onEditingRowCancel: props.onEditingRowCancel,
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
        sx: {
          fontSize: "12px",
        },
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
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default SharedTable;
