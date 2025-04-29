import React, { useMemo, useState } from "react";
import CURRENCIES from "../../assets/currency.json";
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
  TextField,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Currency type definition
type Currency = {
  id: number;
  currencyName: string;
  currencyCode: string;
  symbol: string;
  exchangeRateDecimalPlaces: number;
  valueDecimalPlaces: number;
  useInApp: boolean;
};

// Static keys for detail panel rendering
const expandDataArray = ["id", "currencyName", "currencyCode", "symbol"];
const expandData = {
  id: "ID",
  currencyName: "Currency Name",
  currencyCode: "Currency Code",
  symbol: "Symbol",
};

const Currency = () => {
  const [data, setData] = useState<Currency[]>(CURRENCIES);
  const [editedCurrencies, setEditedCurrencies] = useState<Record<string, Currency>>({});

  // Define table columns
  const columns = useMemo<MRT_ColumnDef<Currency>[]>(() => [
    {
      accessorKey: "currencyName",
      header: "Currency Name",
      size: 150,
      enableEditing: false,
    },
    {
      accessorKey: "currencyCode",
      header: "Code",
      size: 80,
      enableEditing: false,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      size: 80,
      enableEditing: false,
    },
    {
      accessorKey: "exchangeRateDecimalPlaces",
      header: "Decimal Places (Rate)",
      Cell: ({ row }) => (
        <TextField
          type="number"
          size="small"
          value={row.original.exchangeRateDecimalPlaces}
          inputProps={{ min: 0, max: 8 }}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            const updated = data.map((item) =>
              item.id === row.original.id
                ? { ...item, exchangeRateDecimalPlaces: value }
                : item
            );
            setData(updated);

            setEditedCurrencies((prev) => ({
              ...prev,
              [row.original.id]: {
                ...row.original,
                exchangeRateDecimalPlaces: value,
              },
            }));
          }}
        />
      ),
    },
    {
      accessorKey: "valueDecimalPlaces",
      header: "Decimal Places (Value)",
      Cell: ({ row }) => (
        <TextField
          type="number"
          size="small"
          value={row.original.valueDecimalPlaces}
          inputProps={{ min: 0, max: 6 }}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            const updated = data.map((item) =>
              item.id === row.original.id
                ? { ...item, valueDecimalPlaces: value }
                : item
            );
            setData(updated);

            setEditedCurrencies((prev) => ({
              ...prev,
              [row.original.id]: {
                ...row.original,
                valueDecimalPlaces: value,
              },
            }));
          }}
        />
      ),
    },
  ], []);

  // Export to Excel
  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((column) => row.original[column.accessorKey as keyof Currency])
    );
    const tableHeaders = columns.map((col) => col.header);

    downloadExcel({
      fileName: "Currency-table",
      sheet: "countries",
      tablePayload: {
        header: tableHeaders,
        body: tableData,
      },
    });
  };

  // Save edited users
  const handleSave = () => {
    const updatedRows = Object.values(editedCurrencies);

    // Simulate saving - replace with actual API call if needed
    console.log("Saving the following changes:", updatedRows);

    // Clear edited users after saving
    setTimeout(() => {
      setEditedCurrencies({});
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
      columnPinning: { left: ["CurrencyName"], right: ["mrt-row-actions"] },
    },

    // Table container styling
    muiTableProps: { sx: { width: "600px" } },
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
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
          disabled={Object.keys(editedCurrencies).length === 0}
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
              {expandData[key as keyof typeof expandData]}: {row.original[key as keyof Currency]}
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

          setEditedCurrencies((prev) => ({
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

export default Currency;
