import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import PageMenu from "./PageMenu";
import { Page } from "../common/Constants";

interface Props {
  pages: Page[];
  activeIndex: number | null;
  onSelect: (i: number | null) => void;
  onAddPage: (i: number, name: string) => void;
  onReorder: (newOrder: Page[]) => void;
}

const Footer: React.FC<Props> = ({
  pages,
  activeIndex,
  onSelect,
  onAddPage,
  onReorder,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPageIndex, setNewPageIndex] = useState<number>(0);
  const [newPageName, setNewPageName] = useState("");
  const openDialog = (index: number) => {
    setNewPageIndex(index);
    setNewPageName("");
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const handleAddSubmit = () => {
    if (newPageName.trim() !== "") {
      onAddPage(newPageIndex, newPageName.trim());
      closeDialog();
    }
  };
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...pages];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorder(reordered);
    if (activeIndex != null) {
      setFocusedIndex(null);
      if (result.source.index == activeIndex) {
        onSelect(result.destination.index);
      } else if (
        result.source.index < activeIndex &&
        result.destination.index >= activeIndex
      ) {
        onSelect(activeIndex - 1);
      } else if (
        result.source.index > activeIndex &&
        result.destination.index <= activeIndex
      ) {
        onSelect(activeIndex + 1);
      }
    }
  };
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | SVGSVGElement>(
    null
  );
  const menuOpen = Boolean(menuAnchorEl);
  const handleMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleClick = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (activeIndex === index || focusedIndex === index) {
      onSelect(index);
      setFocusedIndex(null);
    } else {
      onSelect(index);
      setFocusedIndex(null);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        py: 2,
        px: 3,
        height: 30,
        display: "flex",
        alignItems: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="footer-icons" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {pages.map((page, index) => (
                <React.Fragment key={page.id}>
                  {/* Draggable page icon */}
                  <Draggable draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          tabIndex={0}
                          style={{ outline: "none" }}
                          onClick={(e) => {
                            if (snapshot.isDragging) {
                              e.preventDefault();
                              e.stopPropagation();
                              return;
                            }
                            handleClick(index, e);
                          }}
                          onFocus={() => setFocusedIndex(index)}
                          onBlur={() => setFocusedIndex(null)}
                          sx={(theme) => ({
                            backgroundColor:
                              activeIndex === index
                                ? "#fff"
                                : focusedIndex === index
                                ? "#fafafa"
                                : theme.palette.grey[200],
                            color:
                              activeIndex === index || focusedIndex === index
                                ? "#F59D0E"
                                : "#8C93A1",
                            border:
                              focusedIndex == index
                                ? `2px solid ${theme.palette.primary.main}`
                                : "none",
                            "&:hover": {
                              backgroundColor:
                                activeIndex === index ? "#fff" : "#ccc",
                              color:
                                activeIndex === index
                                  ? "#F59D0E"
                                  : theme.palette.grey[700],
                            },
                            outline: "none",
                            boxShadow: "none",
                            "&: focus": {
                              outline: "none",
                              boxShadow: "none",
                            },
                            "&: focus-visible": {
                              outline: "none",
                              boxShadow: "none",
                            },
                            borderRadius: 1.2,
                            p: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            columnGap: "0.5rem",
                            textTransform: "none",
                            userSelect: "none",
                            cursor: "pointer",
                          })}
                        >
                          {page.icon}
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: 13,
                              flexGrow: 1,
                              color:
                                activeIndex === index || focusedIndex === index
                                  ? "black"
                                  : undefined,
                            }}
                            noWrap
                          >
                            {page.title}
                          </Typography>
                          {/* Three-dot button only for active */}
                          {activeIndex === index && (
                            <>
                              <MoreVertIcon
                                fontSize="small"
                                sx={{
                                  color: "black",
                                  cursor: "pointer",
                                }}
                                onClick={handleMenuOpen}
                                aria-controls={
                                  menuOpen ? "page-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={menuOpen ? "true" : undefined}
                              />
                              <PageMenu
                                anchorEl={menuAnchorEl}
                                open={menuOpen}
                                onClose={handleMenuClose}
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                  {index < pages.length - 1 && (
                    <Box
                      sx={{
                        position: "relative",
                        width: "5px",
                        height: 60,
                        overflow: "visible",
                        transition: "width 0.2s ease",
                        "&:hover": {
                          width: "60px",
                        },
                        "&:hover .insert-control": {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        className="insert-control"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          transition: "opacity 0.2s ease",
                          zIndex: 2,
                          pointerEvents: "auto",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            borderTop: "1px dashed #999",
                            width: 20,
                            height: 1,
                          }}
                        />
                        <AddCircleOutlineIcon
                          fontSize="small"
                          sx={{
                            mx: 0.5,
                            color: "#000000",
                            cursor: "pointer",
                            userSelect: "none",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                          }}
                          onClick={() => openDialog(index)}
                        />
                        <Box
                          sx={{
                            borderTop: "1px dashed #999",
                            width: 20,
                            height: 1,
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}
              <IconButton
                onClick={() => openDialog(activeIndex ? activeIndex : 0)}
                sx={{
                  ml: 1,
                  backgroundColor: "#fff",
                  color: "black",
                  borderRadius: 1.2,
                  "&:hover": {
                    backgroundColor: "#ccc",
                  },
                }}
              >
                <AddIcon fontSize="small" />
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 13,
                    ml: 0.5,
                  }}
                  noWrap
                >
                  Add Page
                </Typography>
              </IconButton>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 4,
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          columnGap="0.5rem"
          alignItems="center"
          justifyContent="left"
        >
          <NoteAddIcon fontSize="small" sx={{ color: "#F59D0E" }} />
          <Typography
            variant="caption"
            sx={{ fontSize: 15, mt: 1 }}
            gutterBottom
          >
            New Page
          </Typography>
        </Box>

        <TextField
          fullWidth
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          autoFocus
          variant="outlined"
          size="small"
          label="Enter a Page Name"
          sx={{ mt: 2, mb: 3 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button onClick={closeDialog} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            disabled={newPageName == ""}
            variant="contained"
            onClick={handleAddSubmit}
          >
            Add
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
export default Footer;
