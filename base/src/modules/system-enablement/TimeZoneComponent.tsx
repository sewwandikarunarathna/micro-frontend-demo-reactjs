import React, { useMemo, useState } from "react";
import TIMEZONES from "../../assets/timezones.json";
import { useMaterialReactTable, MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { downloadExcel } from "react-export-table-to-excel";
import {
  Box,
  Button,
  Switch,
  Typography,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// TimeZone type definition
type TimeZone = {
  id: number;
  timeZoneName: string;
  utcOffset: string;
  usedInApp: boolean;
};

const expandDataArray = ["id", "timeZoneName", "utcOffset"];
const expandData = {
  id: "ID",
  timeZoneName: "Time Zone Name",
  utcOffset: "UTC Offset",
};

const TimeZoneComponent = () => {
  const [data, setData] = useState<TimeZone[]>(TIMEZONES);
  const [editedZones, setEditedZones] = useState<Record<number, TimeZone>>({});

  const columns = useMemo<MRT_ColumnDef<TimeZone>[]>(() => [
    {
      accessorKey: "timeZoneName",
      header: "Time Zone Name",
      size: 250,
    },
    {
      accessorKey: "utcOffset",
      header: "UTC Offset",
      size: 100,
    },
  ], []);

  const handleExportRows = (rows: any) => {
    const tableData = rows.map((row: any) =>
      columns.map((col) => row.original[col.accessorKey as keyof TimeZone])
    );
    const tableHeaders = columns.map((col) => col.header);

    downloadExcel({
      fileName: "timezones-table",
      sheet: "timezones",
      tablePayload: {
        header: tableHeaders,
        body: tableData,
      },
    });
  };

  const handleSave = () => {
    const updated = Object.values(editedZones);
    console.log("Saving updated time zones:", updated);
    setTimeout(() => setEditedZones({}), 1000);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: false,
    enableRowActions: true,

    enableColumnResizing: true,
    enableStickyHeader: true,

    initialState: {
      density: "compact",
      columnPinning: { left: ["timeZoneName"], right: ["mrt-row-actions"] },
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
          disabled={Object.keys(editedZones).length === 0}
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
              {expandData[key as keyof typeof expandData]}: {row.original[key as keyof TimeZone]}
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

          setEditedZones((prev) => ({
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

export default TimeZoneComponent;
