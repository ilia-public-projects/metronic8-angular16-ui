# Metronic 8 Angular 16 UI

![Angular](https://img.shields.io/badge/Angular-16-red) ![License](https://img.shields.io/badge/license-MIT-green) ![Metronic](https://img.shields.io/badge/Metronic-8-blue)

## Overview

This is an **Angular 16** UI project that utilizes the **Metronic 8** theme for a modern and responsive user interface. The application includes authentication, user management, user authorization to control permissions, and real-time updates for connected users using **SignalR**.

This project serves as a base for enterprise-level web applications with a focus on user management, access control, and real-time communication.

---

## Features

- **Angular 16 UI**: Built with the latest version of Angular.
- **Metronic 8 Theme**: Utilizes Metronic 8, a responsive and customizable theme, to deliver a polished and professional user interface.
- **Authentication**: Secure login and session management for users.
- **User Management**: Manage users, create new accounts, and handle account details.
- **User Authorization**: Manage user roles and permissions to control access to various parts of the application.
- **SignalR Integration**: Displays a list of connected users and real-time updates on user activity.
  
---

## Technology Stack

- **Frontend**:
  - Angular 16
  - Metronic 8 Theme
  - SignalR
- **Authentication & Authorization**:
  - JWT (JSON Web Tokens)
  - Role-based access control (RBAC)
- **Real-time Communication**:
  - SignalR for WebSockets

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v16+)
- [Angular CLI](https://angular.io/cli)
- A self-signed SSL certificate (details below)

### Steps to Run Locally

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ilia-public-projects/metronic8-angular16-ui.git
    cd metronic8-angular16-ui
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up SSL Certificate**:
    - You need a **self-signed SSL certificate** to enable SSL in the development environment.
    - Create or obtain a self-signed certificate (e.g., using OpenSSL), and place the `.crt` and `.key` files inside the `/ssl` folder in the project root.
    - Example command to create a self-signed certificate using OpenSSL:
      ```bash
      openssl req -x509 -newkey rsa:4096 -keyout /ssl/key.pem -out /ssl/cert.pem -days 365 -nodes
      ```

4. **Run the Application**:
    ```bash
    npm start
    ```

    This will run the command `ng serve --ssl=true --configuration development-ssl` using your SSL certificate for the development environment.

5. Open your browser and navigate to `https://localhost:4200`.

---

## SignalR Integration

This project uses **SignalR** for real-time updates. Users can see connected users in real-time as they log in and log out. This can be extended to display additional live data, such as user activity or notifications.

---

## User Management and Authorization

- **User Management**: Administrators can manage user accounts, including creating, editing, and deleting users.
- **Authorization**: User roles and permissions are managed through a role-based access control system, allowing fine-grained access control over various sections of the application.

---


