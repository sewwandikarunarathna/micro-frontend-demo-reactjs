import { Box, IconButton } from "@mui/material";

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
