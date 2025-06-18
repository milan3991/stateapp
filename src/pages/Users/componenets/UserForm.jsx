import React, { useState } from "react";

const UserForm = ({ handleFormSubmit }) => {
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      handleFormSubmit(formData);
      setFormData({ fullName: "", email: "" }); // Reset forme
    }
  };

  return (
    <form onSubmit={onSubmit} className="user-form">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
