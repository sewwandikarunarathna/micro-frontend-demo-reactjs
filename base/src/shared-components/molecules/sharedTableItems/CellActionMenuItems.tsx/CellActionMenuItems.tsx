import { Box, Button, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MRT_ActionMenuItem } from "material-react-table";
import EmailIcon from "@mui/icons-material/Email";

type Props = {
  onEmailButtonClick: any;
  onDownloadButtonClick: any;
  table: any;
};

const CellActionMenuItems = (props: Props) => {
  return (
    <>
      <MRT_ActionMenuItem //or just use the normal MUI MenuItem
        icon={<EmailIcon />}
        key={1}
        label="Send Email"
        onClick={props.onEmailButtonClick}
        table={props.table}
      />,
      <MRT_ActionMenuItem
        icon={<FileDownloadIcon />}
        key={2}
        label="Download"
        onClick={props.onDownloadButtonClick}
        table={props.table}
      />,
    </>
  );
};

export default CellActionMenuItems;
