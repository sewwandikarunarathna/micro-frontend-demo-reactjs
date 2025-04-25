import { Box, Button, Typography } from "@mui/material";
import { Menu } from "antd";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

type Props = {
  onExportButtonClick: any;
  onSaveButtonClick: any;
  editedUsers: Record<string, any>;
  validationErrors: Record<string, string | undefined>;
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
        <Button
          size="small"
          onClick={props.onExportButtonClick}
          startIcon={<FileDownloadIcon />}
        ></Button>
        <Button
          size="small"
          color="success"
          variant="text"
          onClick={props.onSaveButtonClick}
          disabled={
            Object.keys(props.editedUsers).length === 0 ||
            Object.values(props.validationErrors).some((error) => !!error)
          }
        >
          Save
        </Button>
        {Object.values(props.validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    </>
  );
};

export default TopToolbar;
