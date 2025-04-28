const tableStyles = {
  muiTableHeadRowProps: {
    "& .MuiIconButton-root": {
      // For icon buttons specifically
      padding: "2px",
      "& .MuiSvgIcon-root": {
        fontSize: "1.0rem", // Make icons smaller
      },
    },
    "& .MuiInputBase-root": {
      // For search/filter inputs
      height: "20px",
      fontSize: "0.75rem",
      margin: "2px",
    },
  },
  maxWidth: {
    sm: "100px",
    md: "400px",
    lg: "700px",
    xl: "800px",
  },
  muiTopToolbarProps: {
    backgroundColor: "#ECECEE",
    minHeight: "15px",
    maxHeight: "34px",
    padding: "2px 8px",
    "& .MuiButtonBase-root": {
      // Reduce size of buttons
      padding: "2px 6px",
      minWidth: "unset",
    },
    "& .MuiIconButton-root": {
      // For icon buttons specifically
      padding: "2px",
      "& .MuiSvgIcon-root": {
        fontSize: "1.0rem", // Make icons smaller
      },
    },
    "& .MuiInputBase-root": {
      // For search/filter inputs
      height: "26px",
      fontSize: "0.75rem",
      margin: "2px",
    },
  },
  muiBottomToolbarProps: {
    minHeight: "10px",
    maxHeight: "36px",
    padding: "10px",
    "& .MuiTypography-root": {
      fontSize: "0.7rem",
    },
    "& .MuiButtonBase-root": {
      // Reduce size of buttons
      padding: "2px 6px",
      minWidth: "unset",
    },
    "& .MuiIconButton-root": {
      // For icon buttons specifically
      padding: "2px",
      "& .MuiSvgIcon-root": {
        fontSize: "1.0rem", // Make icons smaller
      },
    },
    "& .MuiInputBase-root": {
      // For search/filter inputs
      height: "26px",
      fontSize: "0.75rem",
      margin: "2px",
    },
    "& .MuiInputLabel-root": {
      // "Rows per page:" text
      fontSize: "0.75rem",
    },
    "& .MuiMenu-root": {
      // page number list
      fontSize: "0.75rem",
    },
  },
  muiTableBodyCellProps: {
    fontWeight: "normal",
    fontSize: "12px",
    "&:focus-visible": {
      //or just `&:focus` if you want all focus events to be visible
      outline: "2px solid red",
      outlineOffset: "-2px",
    },
  },
  muiTableHeadCellProps: {
    fontSize: "12px",
  },
};

export default tableStyles;
