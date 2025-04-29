import { Box } from "@mui/material";

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
