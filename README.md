# Employee Dashboard

## 🚀 Overview

The **Employee Dashboard** is a web application designed to manage and visualize employee data efficiently. It provides an interactive data grid with search, filtering, sorting, and performance tracking features.

## 🛠️ Features

- 📊 **Interactive Data Grid** - View, sort, and filter employee records using AG Grid
- 🔍 **Search Functionality** - Dynamic search with live highlighting
- 🎨 **Minimal & User-Friendly UI** - Built with plain CSS for a clean and responsive experience (ShadCN UI was considered but not implemented)
- 🔄 **Real-time Updates** - Reflects data changes instantly
- 📧 **Email Notifications** - Uses EmailJS for email triggering

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript, Vite, CSS
- **State Management:** Redux Toolkit, Redux, Redux Persist
- **Grid Component:** AG Grid
- **Email Handling:** EmailJS

## 🔧 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Sayan108/employee-dashboard.git
cd employee-dashboard
```

### 2️⃣ Install Dependencies

```sh
npm install  # or yarn install
```

### 3️⃣ Start the Development Server

```sh
npm run dev  # or yarn dev
```

### 4️⃣ Open in Browser

Visit `http://localhost:5173` to access the dashboard.

## 📸 Screenshots

_(Add relevant screenshots here)_

## 📌 Usage

- Navigate through the dashboard to view employee details.
- Use the search bar to find employees quickly.
- Filter and sort data using AG Grid options.
- Send emails using EmailJS integration.

## 🏗️ Project Structure

```
📂 employee-dashboard
├── 📁 src
│   ├── 📁 components      # Reusable UI components
│   ├── 📁 pages           # Page components
│   ├── 📁 hooks           # Custom React hooks
│   ├── 📁 redux           # Redux Toolkit store setup
│   ├── 📁 styles          # Global CSS files
│   ├── 📁 assets          # Images, icons, and styles
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
└── 📄 package.json        # Dependencies & scripts
```

## 🚀 Deployment

### Build for Production

```sh
npm run build  # or yarn build
```

```

## 🛠️ Implementation Details
- **Data Persistence:** Implemented using Redux Persist to maintain application state across sessions and it can be further extended using backend apis of any framework .
- **Styling:** Initially planned to use ShadCN UI, but I couldn't . Instead, plain CSS was used to achieve a clean UI.
- **Email Trigger:** Successfully integrated with EmailJS for sending automated emails.

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📜 License
This project is licensed under the **MIT License**.

---
🚀 **Happy Coding!** 🎉

```
