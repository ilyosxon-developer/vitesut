import React, { useState, useEffect } from "react";
import { createUser, getUsers, getUserTypes } from "../../lib/userApi";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userTypes, setUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // User typelarni olish
    getUserTypes()
      .then((data) => {
        setUserTypes(data);
      })
      .catch((error) => {
        console.error("User typelarni olishda xatolik:", error);
      });

    loadUsers();
  }, []);

  const loadUsers = () => {
    getUsers()
      .then((data) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Foydalanuvchilarni olishda xatolik:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
      user_type: selectedUserType,
    };

    try {
      const response = await createUser(userData);
      console.log("Foydalanuvchi muvaffaqiyatli qo‘shildi:", response.data);
      setUsers((prev) => [response.data, ...prev]);
      setLoading(false);
      setModalOpen(true);

      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedUserType("");
    } catch (error) {
      console.error("Foydalanuvchi qo‘shishda xatolik:", error.response);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Yangi Foydalanuvchi Qo‘shish</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" id="username" className="form-control"  value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input type="text" id="firstName" autoComplete="on" className="form-control" autoCapitalize="on" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input type="text" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">User Type:</label>
          <select className="form-select" value={selectedUserType} onChange={(e) => setSelectedUserType(e.target.value)} >
            <option value="">User type tanlang</option>
            {userTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "Qo‘shish"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
