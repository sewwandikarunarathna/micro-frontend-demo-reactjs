import React, { useMemo, useState } from "react";
import UOM_LIST from "../../assets/uom.json";
import { useMaterialReactTable, MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import {
  Box,
  Button,
  Switch,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// UOM type definition
type UOM = {
  id: number;
  uomName: string;
  uomCode: string;
  isBase: boolean;
  conversionFactor: number | null;
  usedInApp: boolean;
};

const expandDataArray = ["id", "uomName", "uomCode", "isBase", "conversionFactor"];
const expandData = {
  id: "ID",
  uomName: "UOM Name",
  uomCode: "UOM Code",
  isBase: "Base Unit",
  conversionFactor: "Conversion Factor",
};

const UOMComponent = () => {
  const [data, setData] = useState<UOM[]>(UOM_LIST);
  const [editedUOMs, setEditedUOMs] = useState<Record<number, UOM>>({});

  const columns = useMemo<MRT_ColumnDef<UOM>[]>(() => [
    {
      accessorKey: "uomName",
      header: "UOM Name",
      size: 150,
    },
    {
      accessorKey: "uomCode",
      header: "UOM Code",
      size: 100,
    },
    {
      accessorKey: "isBase",
      header: "Base Unit",
      size: 100,
      Cell: ({ cell, row }) => (
        <Checkbox
          checked={row.original.isBase}
          onChange={(e) => {
            const updated = data.map((item) =>
              item.id === row.original.id
                ? { ...item, isBase: e.target.checked, conversionFactor: e.target.checked ? 1 : item.conversionFactor }
                : item
            );
            setData(updated);

            setEditedUOMs((prev) => ({
              ...prev,
              [row.original.id]: {
                ...row.original,
                isBase: e.target.checked,
                conversionFactor: e.target.checked ? 1 : row.original.conversionFactor,
              },
            }));
          }}
        />
      ),
    },
    {
      accessorKey: "conversionFactor",
      header: "Conversion Factor",
      size: 120,
      Cell: ({ cell, row }) => (
        <TextField
          type="number"
          inputProps={{ step: "0.000001" }}
          value={row.original.conversionFactor ?? ""}
          disabled={row.original.isBase}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            const updated = data.map((item) =>
              item.id === row.original.id ? { ...item, conversionFactor: val } : item
            );
            setData(updated);

            setEditedUOMs((prev) => ({
              ...prev,
              [row.original.id]: {
                ...row.original,
                conversionFactor: val,
              },
            }));
          }}
        />
      ),
    },
  ], [data]);

  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((col) => row.original[col.accessorKey as keyof UOM])
    );
    const tableHeaders = columns.map((col) => col.header);

    downloadExcel({
      fileName: "uom-table",
      sheet: "uoms",
      tablePayload: {
        header: tableHeaders,
        body: tableData,
      },
    });
  };

  const handleSave = () => {
    const updated = Object.values(editedUOMs).filter(
      (uom) => uom.isBase || uom.conversionFactor !== null
    );

    const hasErrors = updated.some(
      (uom) => !uom.isBase && (!uom.conversionFactor || uom.conversionFactor === 0)
    );

    if (hasErrors) {
      alert("All non-base units must have a valid conversion factor.");
      return;
    }

    console.log("Saving updated UOMs:", updated);
    setTimeout(() => setEditedUOMs({}), 1000);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
    enableRowActions: true,
    editDisplayMode: "cell",

    enableColumnResizing: true,
    enableColumnPinning: true,
    enableRowSelection: true,
    enableClickToCopy: "context-menu",
    enableFullScreenToggle: true,
    enableStickyHeader: true,

    initialState: {
      density: "compact",
      columnPinning: { left: ["uomName"], right: ["mrt-row-actions"] },
    },

    muiTableProps: { sx: { width: "100%" } },
    muiTableContainerProps: { sx: { maxHeight: "350px" } },

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
          disabled={Object.keys(editedUOMs).length === 0}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    ),

    renderDetailPanel: ({ row }) =>
      row.original ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%" }}>
          {expandDataArray.map((key) => (
            <Typography key={key}>
              {expandData[key as keyof typeof expandData]}: {`${row.original[key as keyof UOM]}`}
            </Typography>
          ))}
        </Box>
      ) : null,

    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Used in App",
        size: 120,
      },
    },

    renderRowActions: ({ row }) => (
      <Switch
        checked={row.original.usedInApp}
        onChange={(e) => {
          const updated = data.map((item) =>
            item.id === row.original.id
              ? { ...item, usedInApp: e.target.checked }
              : item
          );
          setData(updated);

          setEditedUOMs((prev) => ({
            ...prev,
            [row.original.id]: {
              ...row.original,
              usedInApp: e.target.checked,
            },
          }));
        }}
      />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default UOMComponent;
