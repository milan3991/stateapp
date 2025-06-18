import React, { useState } from "react";
import "./style.users.css";
import UserForm from "./componenets/UserForm";
import UserList from "./componenets/UserList";

const App = () => {
  const [users, setUsers] = useState([]); 

  const handleFormSubmit = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="container">
      <h1>User Manager</h1>
      <UserForm handleFormSubmit={handleFormSubmit} />
      <UserList users={users} />
    </div>
  );
};

export default App;
