import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, useTheme } from "@mui/material";
import { Global, css } from "@emotion/react";
import { MaterialReactTable } from "material-react-table";
import { Button } from "antd";

// Shared Custom Theme
const sharedTheme = createTheme({
    palette: {
      primary: {
        main: "#1890ff", // Matches Ant Design's default primary color
      },
      secondary: {
        main: "#f5222d", // Matches Ant Design's error color
      },
      background: {
        default: "#f5f5f5", // Neutral background for both libraries
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif", // Shared font family
    },
  });
  
  // Global Styles (for aligning Material-UI and Ant Design)
  const GlobalStyles = () => {
    const theme = useTheme();
    return (
      <Global
        styles={css`
          body {
            font-family: ${theme.typography.fontFamily};
            background-color: ${theme.palette.background.default};
            margin: 0;
            padding: 0;
          }
  
          .ant-btn-primary {
            background-color: ${theme.palette.primary.main};
            border-color: ${theme.palette.primary.main};
          }
  
          .ant-btn-primary:hover {
            background-color: ${theme.palette.primary.dark};
            border-color: ${theme.palette.primary.dark};
          }
  
          .ant-table-thead > tr > th {
            background-color: ${theme.palette.primary.light};
            color: white;
          }
        `}
      />
    );
  };

  // Sample Data for Material React Table
const data = [
    { id: 1, name: "John Doe", age: 28, city: "New York" },
    { id: 2, name: "Jane Smith", age: 34, city: "Los Angeles" },
  ];
  
  // Columns for Material React Table
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "city", header: "City" },
  ];

const ThemeLayout = () => {
  return (
    <ThemeProvider theme={sharedTheme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: sharedTheme.palette.primary.main,
            borderRadius: 8,
            fontFamily: sharedTheme.typography.fontFamily,
          },
        }}
      >
        <CssBaseline />
        <GlobalStyles />
        <div style={{ padding: "20px" }}>
          <h1 style={{ textAlign: "center" }}>Combined Ant Design and MRT</h1>

          {/* Material React Table */}
          <MaterialReactTable
            columns={columns}
            data={data}
            enableSorting
            enableRowSelection
            muiTableBodyRowProps={{
              sx: {
                "&.Mui-selected": {
                  backgroundColor: sharedTheme.palette.primary.light,
                },
              },
            }}
          />

          {/* Ant Design Button */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button type="primary">Ant Design Button</Button>
          </div>
        </div>
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default ThemeLayout
