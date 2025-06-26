import React from "react";
import { Box, Typography, TextField } from "@mui/material";
interface Props {
  title: string;
  content: React.ReactNode;
}

const FormPage: React.FC<Props> = ({ title, content }) => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: "100%",
        backgroundColor: "#191970",
      }}
    >
      {content}
    </Box>
  );
};
export default FormPage;
