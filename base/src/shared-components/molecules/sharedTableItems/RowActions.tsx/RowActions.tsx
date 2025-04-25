import { Box, Button, IconButton, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MRT_ActionMenuItem } from "material-react-table";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  rowActionButtons: any;
};

const RowActions = (props: Props) => {
  return (
    <>
      <Box sx={{ display: "flex", gap: "8px" }}>
        {props.rowActionButtons.map((button: any) => {
          return (
            <IconButton
              key={button.icon}
              color={button.color}
              onClick={button.onClick}
            >
              {button.icon}
            </IconButton>
          );
        })}
      </Box>
    </>
  );
};

export default RowActions;
