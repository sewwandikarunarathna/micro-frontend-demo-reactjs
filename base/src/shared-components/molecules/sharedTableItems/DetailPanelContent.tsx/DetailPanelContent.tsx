import { Box, Button, IconButton, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { MRT_ActionMenuItem } from "material-react-table";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  row: any;
  expandData: any;
  itemId: string;
};

const DetailPanelContent = (props: Props) => {
  return (
    <>
      <Typography key={props.itemId}>
        {props.expandData[props.itemId as keyof typeof props.expandData]}:{" "}
        {(props?.row?.original as any)[props.itemId]}
      </Typography>
    </>
  );
};

export default DetailPanelContent;
