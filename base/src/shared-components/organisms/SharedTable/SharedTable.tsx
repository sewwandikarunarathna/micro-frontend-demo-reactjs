import {
  MaterialReactTable,
  MRT_DensityState,
  useMaterialReactTable,
} from "material-react-table";
import _ from "lodash";
import tableStyles from "../../../utils/tableStyles.ts";

type Props = {
  columns: any;
  data: any;
  isDataLoading?: boolean;
  tableDensity?: MRT_DensityState | undefined;
  leftColumnPinning?: string[];
  rightColumnPinning?: string[];
  tableWidth?: string | {};
  tableContainerHeight?: string;
  customRowHeight?: any;
  changeEditingMode?: editingModeProps;
  renderCellActionMenuItems?: any;
  renderRowActions?: any;
  enableRowActions?: boolean;
  renderTopToolbarCustomActions?: any;
  renderDetailPanel: any;
  onEditingRowSave?: any;
  onEditingRowCancel: any;
  displayColumnDefOptions?: any;
};

type editingModeProps = "cell" | "table" | "row" | "custom" | "modal";

const SharedTable = (props: Props) => {
  // Function to determine row height based on density
  const getRowHeight = (density: MRT_DensityState) => {
    if (!props.customRowHeight) return {};

    const height =
      typeof props.customRowHeight === "function"
        ? props.customRowHeight(density)
        : props.customRowHeight[density] || {};

    return height;
  };
  const tableProps = useMaterialReactTable({
    columns: props.columns,
    data: props.data,
    initialState: {
      density: props.tableDensity,
      columnPinning: {
        left: props.leftColumnPinning,
        right: props.rightColumnPinning,
      }, //make columns fixed
    },
    muiTableHeadRowProps: {
      sx: tableStyles.muiTableHeadRowProps,
    },
    // Apply height constraints only to regular rows, not expanded ones
    muiTableBodyRowProps: ({ row, table }) => ({
      sx: {
        // Only apply height constraints if the row is NOT expanded
        ...(row.getIsExpanded() ? {} : getRowHeight(table.getState().density)),
      },
    }),
    layoutMode: "grid", // This makes columns distribute width better
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: "onChange", //default
    columnResizeDirection: "rtl",
    enableBatchRowSelection: true, //enable batch row selection with shift key
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
        // Make the table width responsive
        // maxWidth: tableStyles.maxWidth,
        maxHeight: props.tableContainerHeight ?? "220px",
        width: '100%', // Take full width of the container
            tableLayout: 'fixed',
      },
    },
    muiTableContainerProps: {
      sx: {
        width: '100%',
      },
    },
    muiTopToolbarProps: {
      sx: tableStyles.muiTopToolbarProps,
    },
    positionToolbarAlertBanner: "bottom",
    muiToolbarAlertBannerProps: tableStyles.muiToolbarAlertBannerProps, //alert banner (row selection)
    muiBottomToolbarProps: {
      sx: tableStyles.muiBottomToolbarProps,
    },
    muiTablePaperProps: ({ table }) => ({
      style: {
        zIndex: table.getState().isFullScreen ? 1000 : undefined,
        top: table.getState().isFullScreen ? "200px" : 0,
        // maxWidth: props.tableWidth ?? '800px',
      },
      sx: {
        maxWidth: props.tableWidth ?? tableStyles.maxWidth 
      }
    }),
    renderTopToolbarCustomActions: props.renderTopToolbarCustomActions,
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
    renderDetailPanel: props.renderDetailPanel,
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
      sx: tableStyles.muiTableBodyCellProps,
    }),
    renderCellActionMenuItems: props.renderCellActionMenuItems,
    //row actions
    enableRowActions: props.enableRowActions ?? false,
    onEditingRowSave: props.onEditingRowSave,
    onEditingRowCancel: props.onEditingRowCancel,
    // renderRowActions: props.renderRowActions,
    // displayColumnDefOptions: props.displayColumnDefOptions ? {
    //   "mrt-row-actions": props.displayColumnDefOptions
    // } : {},
    //add custom keyboard shortcuts
    defaultColumn: {
      maxSize: 400,
      minSize: 80,
      size: 160, //default size is usually 180
      //header
      muiTableHeadCellProps: {
        sx: tableStyles.muiTableHeadCellProps,
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
      <MaterialReactTable table={tableProps} />
    </>
  );
};

export default SharedTable;
