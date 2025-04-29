import React, { useMemo, useState } from "react";
import COUNTRY from "../../assets/country.json";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import {
  Box,
  Button,
  Switch,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Country type definition
type Country = {
  id: number;
  countryName: string;
  countryCode: string;
  useInApp: boolean;
};

// Static keys for detail panel rendering
const expandDataArray = ["id", "countryName", "countryCode"];
const expandData = {
  id: "ID",
  countryCode: "Country Code",
  countryName: "Country Name",
};

const Country = () => {
  const [data, setData] = useState<Country[]>(COUNTRY);
  const [editedUsers, setEditedUsers] = useState<Record<string, Country>>({});

  // Define table columns
  const columns = useMemo<MRT_ColumnDef<Country>[]>(() => [
    {
      accessorKey: "countryName",
      header: "Country Name",
      size: 150,
      enableEditing: false, // Read-only
    },
    {
      accessorKey: "countryCode",
      header: "Country Code",
      size: 150,
      enableEditing: false, // Read-only
    },
  ], []);

  // Export to Excel
  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((column) => row.original[column.accessorKey as keyof Country])
    );
    const tableHeaders = columns.map((col) => col.header);

    downloadExcel({
      fileName: "country-table",
      sheet: "countries",
      tablePayload: {
        header: tableHeaders,
        body: tableData,
      },
    });
  };

  // Save edited users
  const handleSave = () => {
    const updatedRows = Object.values(editedUsers);

    // Simulate saving - replace with actual API call if needed
    console.log("Saving the following changes:", updatedRows);

    // Clear edited users after saving
    setTimeout(() => {
      setEditedUsers({});
    }, 1000);
  };

  // Setup table instance
  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    enableRowActions: true,
    editDisplayMode: "cell",

    // Enable features
    enableColumnResizing: true,
    enableColumnPinning: true,
    enableRowSelection: true,
    enableClickToCopy: "context-menu",
    enableFullScreenToggle: true,
    enableStickyHeader: true,

    initialState: {
      density: "compact",
      columnPinning: { left: ["countryName"], right: ["mrt-row-actions"] },
    },

    // Table container styling
    muiTableProps: { sx: { width: "600px" } },
    muiTableContainerProps: { sx: { maxHeight: "250px" } },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#ECECEE",
        color: "text.secondary",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      },
    },

    // Action buttons on toolbar
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        <Button
          size="small"
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
        <Button
          size="small"
          color="success"
          variant="contained"
          disabled={Object.keys(editedUsers).length === 0}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    ),

    // Optional detail panel
    renderDetailPanel: ({ row }) =>
      row.original ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%" }}>
          {expandDataArray.map((key) => (
            <Typography key={key}>
              {expandData[key as keyof typeof expandData]}: {row.original[key as keyof Country]}
            </Typography>
          ))}
        </Box>
      ) : null,

    // Column config for the action column
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Use in App",
        size: 120,
      },
    },

    // Row-level toggle switch for `useInApp`
    renderRowActions: ({ row }) => (
      <Switch
        checked={row.original.useInApp}
        onChange={(e) => {
          const updated = data.map((item) =>
            item.id === row.original.id
              ? { ...item, useInApp: e.target.checked }
              : item
          );
          setData(updated);

          const updatedRow = {
            ...row.original,
            useInApp: e.target.checked,
          };

          setEditedUsers((prev) => ({
            ...prev,
            [row.original.id]: updatedRow,
          }));
        }}
      />
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Country;
