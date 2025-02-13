import { useState } from "react";

const UserAddModal = ({ show, handleClose, handleAddUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    user_type: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser(formData);
  };

  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Foydalanuvchi qo‘shish</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input type="text" className="form-control mb-2" name="username" placeholder="Username" onChange={handleChange} required />
              <input type="password" className="form-control mb-2" name="password" placeholder="Password" onChange={handleChange} required />
              <input type="text" className="form-control mb-2" name="first_name" placeholder="First Name" onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="last_name" placeholder="Last Name" onChange={handleChange} />
              <input type="email" className="form-control mb-2" name="email" placeholder="Email Address" onChange={handleChange} />
              <input type="text" className="form-control mb-2" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
              <select className="form-control mb-2" name="user_type" onChange={handleChange}>
                <option value="Admin">Admin</option>
                <option value="Klient">Klient</option>
              </select>
              <button type="submit" className="btn btn-primary w-100">Qo‘shish</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddModal;
