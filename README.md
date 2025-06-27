# 📘 Page Navigation UI with MUI & Drag-and-Drop

This project implements a responsive page navigation interface using **Material UI (MUI)** and **@hello-pangea/dnd**. It supports drag-and-drop reordering of the form pages - designed for a dark background with white-themed components.

---

## ✨ Features

- 🧩 Drag-and-drop navigation using `@hello-pangea/dnd`
- 🎨 Material UI (MUI) styling
- ⚡ Modular and type-safe code structure using TypeScript

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **Material UI**
- **@hello-pangea/dnd**
- **@mui/icons-material**

---

## 📁 Folder Structure

```text
src/
│
├── App.tsx # Main component 
├── components/
│ ├── Footer.tsx # Reusable footer component
│ ├── PageMenu.tsx # Menu for active Page
│ └── FormPage.tsx # Content Page
│
└── common/
  └── Constants.tsx # Shared constants used in the app
```

## 🚀 Getting Started

### 1. Clone the repository

- git clone https://github.com/shahfath/fillout-page-navigation.git
- cd fillout-page-navigation

### 2.  Install dependencies
- npm install

### 3. Start the development server
- npm start
- The app will run at http://localhost:3000