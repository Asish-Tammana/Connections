# Connections - A MERN Stack Chatting Web Application

Connections is a robust and feature-rich chatting web application built using the MERN stack. It offers seamless one-to-one and group chat functionalities, leveraging modern web technologies to ensure a smooth and real-time communication experience.

## Features

- **Login with Google Account:**
  - Integrated Google OAuth for secure and quick authentication, allowing users to log in with their Google accounts effortlessly.
  
- **One-to-One Chat and Group Chat:**
  - Supports both private one-on-one conversations and group chats, enabling users to interact with multiple participants in real-time.

- **Routing for Differentiated Chats:**
  - Utilizes dynamic routing to differentiate between one-to-one and group chats, providing a clear and intuitive navigation experience.

- **User Search and New Conversations:**
  - Implements a powerful search functionality that allows users to search for other users within the application and start new conversations with them easily.

- **Real-Time Messaging with Socket.io:**
  - Employs Socket.io for real-time bidirectional communication, ensuring messages are delivered instantly without refreshing the page.

- **Real-Time Notifications:**
  - Features real-time notifications for new messages and updates, keeping users informed and engaged with timely alerts.

## Technologies Used

### Frontend
- **React.js:** For building a responsive and interactive user interface.
- **Redux & Redux-Thunk:** For state management and handling asynchronous operations.
- **Tailwind CSS:** For creating a modern, responsive design.
- **Material UI:** For implementing stylish and functional UI components.
- **HTML & CSS:** For structuring and styling the web pages.

### Backend
- **Node.js & Express.js:** For building a scalable and efficient server-side application.
- **MongoDB:** For storing user data, messages, and chat information in a NoSQL database.
- **Socket.io:** For enabling real-time, event-based communication between the client and server.
- **Authentication & Authorization:** Ensuring secure access to the application using JWT and Google OAuth.

## Additional Functionalities

- **Routing:**
  - Utilized React Router for handling navigation and routing within the application, ensuring a seamless user experience.
  
- **Security:**
  - Implemented robust authentication and authorization mechanisms to protect user data and prevent unauthorized access.
  
- **Performance Optimization:**
  - Optimized both frontend and backend for fast load times and efficient data handling, ensuring a smooth user experience even with a large number of users and messages.

## Project Impact

Connections demonstrates the ability to build complex, feature-rich web applications using modern web technologies. It showcases skills in full-stack development, real-time communication, user authentication, and responsive design, making it a significant addition to any technical portfolio.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Asish-Tammana/connections.git
    ```
2. Navigate to the project directory:
    ```bash
    cd connections
    ```
3. Install dependencies for both the frontend and backend:
    ```bash
    npm install
    cd frontend
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```bash
    npm run backend
    ```
2. Start the frontend development server:
    ```bash
    npm run frontend
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```env
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret_key
```

### Contributing

- Contributions are welcome! Please fork the repository and create a pull request with your changes
