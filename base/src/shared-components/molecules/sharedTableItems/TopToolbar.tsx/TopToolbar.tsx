import { Box, Button, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

type Props = {
  children?: React.ReactNode;
};

const TopToolbar = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "4px",
          "& .MuiButtonBase-root": {
            // Reduce size of buttons
            padding: "2px 6px",
            minWidth: "unset",
          },
          flexWrap: "wrap",
        }}
      >
        {props.children}
      </Box>
    </>
  );
};

export default TopToolbar;
