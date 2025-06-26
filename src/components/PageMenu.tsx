import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Divider, Typography } from "@mui/material";

interface PageMenuProps {
  anchorEl: SVGSVGElement | null;

  open: boolean;
  onClose: () => void;
}
const PageMenu: React.FC<PageMenuProps> = ({ anchorEl, open, onClose }) => {
  return (
    <Menu
      id="page-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      PaperProps={{
        sx: { mt: "-12px", ml: "9px" },
      }}
    >
      <MenuItem>
        <FlagIcon
          color="primary"
          fontSize="small"
          sx={{ mr: 1, fontsize: 16 }}
        />
        <Typography variant="caption" sx={{ fontSize: 13, ml: 0.5 }} noWrap>
          Set as First Page
        </Typography>
      </MenuItem>

      <MenuItem>
        <EditIcon
          color="primary"
          fontSize="small"
          sx={{ mr: 1, fontsize: 16 }}
        />
        <Typography variant="caption" sx={{ fontSize: 13, ml: 0.5 }} noWrap>
          Rename
        </Typography>
      </MenuItem>

      <MenuItem>
        <ContentPasteIcon
          color="action"
          fontSize="small"
          sx={{ mr: 1, fontsize: 16 }}
        />
        <Typography variant="caption" sx={{ fontSize: 13, ml: 0.5 }} noWrap>
          Copy
        </Typography>
      </MenuItem>

      <MenuItem>
        <ContentCopyIcon
          color="action"
          fontSize="small"
          sx={{ mr: 1, fontsize: 16 }}
        />
        <Typography variant="caption" sx={{ fontSize: 13, ml: 0.5 }} noWrap>
          Duplicate
        </Typography>
      </MenuItem>
      <Divider sx={{ m: 1.5 }} />
      <MenuItem>
        <DeleteIcon
          color="error"
          fontSize="small"
          sx={{ mr: 1, fontsize: 16 }}
        />
        <Typography variant="caption" sx={{ fontSize: 13, ml: 0.5 }} noWrap>
          Delete
        </Typography>
      </MenuItem>
    </Menu>
  );
};
export default PageMenu;
