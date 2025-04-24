import { Box, Button, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

type Props = {
  children: any;
};

const DetailPanel = (props: Props) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          padding: "8px",
          "& .MuiTypography-root": {
            fontSize: "0.75rem",
          },
        }}
      >
        {props.children}
      </Box>
    </>
  );
};

export default DetailPanel;
