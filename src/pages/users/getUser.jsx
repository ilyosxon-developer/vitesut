import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersComponent() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [editUser, setEditUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Tokenni global ravishda sozlash
    axios.defaults.headers.common["Authorization"] = `Bearer YOUR_TOKEN_HERE`;

    fetchUsers();
  }, []);

  useEffect(() => {
    // Xabarni avtomatik yo'q qilish
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://crmapimilk.pythonanywhere.com/users/") 
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        setMessage("Foydalanuvchilarni olishda xatolik yuz berdi.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addUser = () => {
    if (!newUser.username.trim() || !newUser.password.trim()) {
      setMessage("Username va parolni kiriting!");
      return;
    }

    axios
      .post("https://crmapimilk.pythonanywhere.com/users/", newUser)
      .then((response) => {
        setMessage("Yangi foydalanuvchi qo'shildi!");
        setData((prevData) => [...prevData, response.data]);
        setNewUser({ username: "", password: "" });
        setShowModal(false);
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://crmapimilk.pythonanywhere.com/users/${id}/`)
      .then(() => {
        setMessage(`Foydalanuvchi muvaffaqiyatli o'chirildi!`);
        setData((prevData) => prevData.filter((user) => user.id !== id));
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
      });
  };

  const startEditing = (user) => {
    setEditUser(user);
    console.log(user);
    
  };

  const saveEdit = () => {
    if (!editUser.username.trim()) {
      setMessage("Username bo'sh bo'lishi mumkin emas!");
      log(editUser);
      return;
    }

    axios
      .put(`https://crmapimilk.pythonanywhere.com/users/${editUser.id}/`, {
        username: editUser.username,
      })
      .then((response) => {
        setMessage("Foydalanuvchi muvaffaqiyatli tahrirlandi!");
        setData((prevData) =>
          prevData.map((user) => (user.id === editUser.id ? response.data : user))
        );
        setEditUser(null);
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
      });
  };

  const viewDetails = (user) => {
    setViewUser(user);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Foydalanuvchilar</h1>
     

      {/* Xabar */}
      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

      {/* Yangi foydalanuvchi qo'shish tugmasi */}
      <div className="mb-4 text-end">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add
        </button>
      </div>

      {/* Loader yoki jadval */}
      {loading ? (
        <p className="text-center">Yuklanmoqda...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {editUser && editUser.id === user.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editUser.username}
                      onChange={(e) =>
                        setEditUser({ ...editUser, username: e.target.value })
                      }
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="text-center">
                  {editUser && editUser.id === user.id ? (
                    <>
                      <button
                        className="btn btn-success me-2"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditUser(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => startEditing(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => viewDetails(user)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal oynasi - Yangi qo'shish */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Yangi Foydalanuvchi Qo'shish</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  placeholder="Username kiriting"
                />
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Parol kiriting"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Bekor qilish
                </button>
                <button className="btn btn-primary" onClick={addUser}>
                  Qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal oynasi - View */}
      {viewUser && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Foydalanuvchi Tafsilotlari</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {viewUser.id}
                </p>
                <p>
                  <strong>Username:</strong> {viewUser.username}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setViewUser(null)}
                >
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersComponent;


