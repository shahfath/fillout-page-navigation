import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export type Page = {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export const defaultPages: Page[] = [
  {
    id: uuidv4(),
    title: "Info",
    icon: <InfoOutlineIcon fontSize="small" />,
    content: (
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 500,
          p: 2,
          color: "white",
        }}
        noValidate
      >
        <Typography variant="h5">What's your name?</Typography>
        <TextField
          variant="filled"
          size="small"
          slotProps={{
            input: {
              sx: {
                bgcolor: "#003d80", // gray background
                color: "white",
                borderRadius: 1,
                "&:hover": { bgcolor: "#555" },
                "& input": {
                  color: "white",
                },
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{ width: "25%" }}
          endIcon={<ArrowRightAltIcon />}
        >
          Next
        </Button>
      </Box>
    ),
  },
  {
    id: uuidv4(),
    title: "Details",
    icon: <DescriptionIcon fontSize="small" />,
    content: "Details about the topic are shown here.",
  },
  {
    id: uuidv4(),
    title: "Other",
    icon: <DescriptionIcon fontSize="small" />,
    content: "Details about the topic are shown here.",
  },
  {
    id: uuidv4(),
    title: "Ending",
    icon: <CheckCircleIcon fontSize="small" />,
    content: "Final summary content goes here.",
  },
];
