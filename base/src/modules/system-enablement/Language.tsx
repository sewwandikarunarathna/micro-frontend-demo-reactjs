import React, { useMemo, useState } from "react";
import LANGUAGES from "../../assets/language.json"; // ISO 639-1 language list
import { useMaterialReactTable, MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import {
  Box,
  Button,
  Switch,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Language type definition
type Language = {
  id: number;
  languageName: string;
  languageCode: string;
  usedInApp: boolean;
};

const expandDataArray = ["id", "languageName", "languageCode"];
const expandData = {
  id: "ID",
  languageName: "Language Name",
  languageCode: "Language Code",
};

const Language = () => {
  const [data, setData] = useState<Language[]>(LANGUAGES);
  const [editedLanguages, setEditedLanguages] = useState<Record<string, Language>>({});

  const columns = useMemo<MRT_ColumnDef<Language>[]>(() => [
    {
      accessorKey: "languageName",
      header: "Language Name",
      size: 200,
      enableEditing: false,
    },
    {
      accessorKey: "languageCode",
      header: "Language Code",
      size: 100,
      enableEditing: false,
    },
  ], []);

  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((col) => row.original[col.accessorKey as keyof Language])
    );
    const tableHeaders = columns.map((col) => col.header);

    downloadExcel({
      fileName: "language-table",
      sheet: "languages",
      tablePayload: {
        header: tableHeaders,
        body: tableData,
      },
    });
  };

  const handleSave = () => {
    const updatedRows = Object.values(editedLanguages);
    console.log("Saving the following changes:", updatedRows);

    setTimeout(() => {
      setEditedLanguages({});
    }, 1000);
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
      columnPinning: { left: ["languageName"], right: ["mrt-row-actions"] },
    },

    muiTableProps: { sx: { width: "700px" } },
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#F5F5F5",
        color: "text.secondary",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      },
    },

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
          disabled={Object.keys(editedLanguages).length === 0}
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
              {expandData[key as keyof typeof expandData]}: {row.original[key as keyof Language]}
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

          const updatedRow = {
            ...row.original,
            usedInApp: e.target.checked,
          };

          setEditedLanguages((prev) => ({
            ...prev,
            [row.original.id]: updatedRow,
          }));
        }}
      />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default Language;
