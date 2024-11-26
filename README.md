# Role-Based Access Control (RBAC) System

## 📋 Overview
The Role-Based Access Control (RBAC) System is a web application that allows administrators to manage users and roles effectively. Built with React.js and styled using Material-UI, the project provides an intuitive interface for viewing, adding, and managing roles and users.

## ✨ Features
- 🖥️ **Dashboard:** Displays a quick summary of total users and roles.
- 📂 **Side Navigation:** Provides tabs for "Home," "Roles," and "Users."
- 👤 **User Management:** Add, view, edit, and delete users.
- 🔑 **Role Management:** Add, view, edit, and delete roles.
- 🔄 **Dynamic Updates:** Automatically reflects changes to user and role data.
- 📱 **Responsive Design:** Works seamlessly across devices.

## 🛠️ Tech Stack
| Technology      | Description                    |
|-----------------|--------------------------------|
| ⚛️ React.js     | Frontend framework             |
| 🎨 Material-UI  | UI components and styling      |
| 🌐 React Router | Navigation between app pages   |
| 🔧 Mock API     | Simulates backend API endpoints|

## 🚀 Getting Started

### 📋 Prerequisites
- 🛠️ Node.js (v14 or higher)
- 📦 npm or yarn package manager

### 🔧 Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/rbac-ui.git
    cd rbac-ui
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the application:**
    ```bash
    npm start
    ```

4. **Open the application in your browser at:**
    ```url
    http://localhost:3000
    ```

## 📂 Project Structure

src/
├── components/          # Reusable components (e.g.,  AddRoleModal, NavBar, SideNav, RoleTable, UserTable,)
├── pages/               # Pages (e.g., Dashboard, Roles, Users, Login)
├── services/            # Mock API services
├── App.js               # Main App component
├── index.js             # React entry point
└── App.css              # Global styles

## 🌐 Mock API Endpoints
This project uses a mock API for demonstration purposes. You can find the mock API service in the `src/services/` directory.

| Endpoint | Method | Description            |
|----------|--------|------------------------|
| /users   | GET    | Retrieve all users     |
| /roles   | GET    | Retrieve all roles     |

## 📸 Screenshots


### Dashboard
![Dashboard](Screenshots\screenshot1.png)

### Roles Page
![Roles Page](Screenshots\screenshot2.png)

### Users Page
![Users Page](Screenshots\screenshot3.png)


## 🤝 Contributing
Contributions are welcome! Please follow these steps:

1. 🍴 **Fork the repository**
2. 🌿 **Create a new branch** (`git checkout -b feature/your-feature`)
3. 💾 **Commit your changes** (`git commit -m 'Add new feature'`)
4. 📤 **Push to the branch** (`git push origin feature/your-feature`)
5. 🔃 **Open a Pull Request**


