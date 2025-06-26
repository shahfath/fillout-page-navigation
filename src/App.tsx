import React, { useState } from "react";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import FormPage from "./components/FormPage";
import { defaultPages, Page } from "./common/Constants";
import { v4 as uuidv4 } from "uuid";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const App: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(defaultPages);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleAddPage = (index: number, name: string) => {
    const newPages = [...pages];
    newPages.splice(index + 1, 0, {
      id: uuidv4(),
      title: name,
      content: "New Page is created",
      icon: <FileUploadIcon fontSize="small" />,
    });
    setPages(newPages);
  };
  const handleReorder = (newOrder: Page[]) => {
    setPages(newOrder);
  };
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#121212",
          color: "#fff",
        }}
      >
        <FormPage
          title={pages[activeIndex ? activeIndex : 0].title}
          content={pages[activeIndex ? activeIndex : 0].content}
        />
      </Box>
      <Footer
        pages={pages}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        onAddPage={handleAddPage}
        onReorder={handleReorder}
      />
    </Box>
  );
};
export default App;
