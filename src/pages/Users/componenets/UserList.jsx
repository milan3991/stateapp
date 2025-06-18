import React from "react";

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <p className="no-users">No users added yet.</p>;
  }

  return (
    <div className="user-list">
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
