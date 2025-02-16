// import { useState, useEffect } from "react";
// import axios from "axios";
// import DeleteUser from './deleteUser'
// import { httpRequest } from "@services/axios.service";

// import AddUserForm from "./add";
// function UsersComponent() {
//   const [data, setData] = useState([]);
//   const [newUser, setNewUser] = useState({ username: "", password: "" });
//   const [editUser, setEditUser] = useState(null);
//   const [viewUser, setViewUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const fetchUsers = async () => {
//     setLoading(true)
//     try {
//       const data = await httpRequest.get('/users/')
//       setData(data.results);
//     } catch (error) {
//       console.log({ error })
//       setMessage("Foydalanuvchilarni olishda xatolik yuz berdi.");
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     // Xabarni avtomatik yo'q qilish
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   const addUser = () => {
//     if (!newUser.username.trim() || !newUser.password.trim()) {
//       setMessage("Username va parolni kiriting!");
//       return;
//     }

//     axios
//       .post("https://crmapimilk.pythonanywhere.com/users/", newUser)
//       .then((response) => {
//         setMessage("Yangi foydalanuvchi qo'shildi!");
//         setData((prevData) => [...prevData, response.data]);
//         setNewUser({ username: "", password: "" });
//         setShowModal(false);
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
//       });
//   };

//   const deleteUser = (id) => {
//     axios
//       .delete(`https://crmapimilk.pythonanywhere.com/users/${id}/`)
//       .then(() => {
//         setMessage(`Foydalanuvchi muvaffaqiyatli o'chirildi!`);
//         setData((prevData) => prevData.filter((user) => user.id !== id));
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
//       });
//   };

//   const startEditing = (user) => {
//     setEditUser(user);
//     console.log(user);

//   };

//   const saveEdit = () => {
//     if (!editUser.username.trim()) {
//       setMessage("Username bo'sh bo'lishi mumkin emas!");
//       log(editUser);
//       return;
//     }

//     axios
//       .put(`https://crmapimilk.pythonanywhere.com/users/${editUser.id}/`, {
//         username: editUser.username,
//       })
//       .then((response) => {
//         setMessage("Foydalanuvchi muvaffaqiyatli tahrirlandi!");
//         setData((prevData) =>
//           prevData.map((user) => (user.id === editUser.id ? response.data : user))
//         );
//         setEditUser(null);
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.response?.data?.detail || error.message}`);
//       });
//   };

//   const viewDetails = (user) => {
//     setViewUser(user);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Foydalanuvchilar</h1>
//       {/* Xabar */}
//       {message && (
//         <div className="alert alert-info text-center" role="alert">
//           {message}
//         </div>
//       )}

//       {/* Yangi foydalanuvchi qo'shish tugmasi */}
      
//       <button onClick={showModal}>add</button>

//       {/* Loader yoki jadval */}
//       {loading ? (
//         <p className="text-center">Yuklanmoqda...</p>
//       ) : (
//         <table className="table table-bordered table-hover">
//           <thead className="table-light">
//             <tr>
//               <th>ID</th>
//               <th>Username</th>
//               <th>Email</th>
//               <th>First name</th>
//               <th>Last name</th>
//               <th>Number</th>
//               <th>User type</th>
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.username
//                   )}
//                 </td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.email
//                   )}
//                 </td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.first_name
//                   )}
//                 </td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.last_name
//                   )}
//                 </td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.phone_number
//                   )}
//                 </td>
//                 <td>
//                   {editUser && editUser.id === user.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editUser.username}
//                       onChange={(e) =>
//                         setEditUser({ ...editUser, username: e.target.value })
//                       }
//                     />
//                   ) : (
//                     user.user_type
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {editUser && editUser.id === user.id ? (
//                     <>
//                       {/* <button
//                         className="btn btn-success me-2"
//                         onClick={saveEdit}
//                       >
//                         Save
//                       </button>
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => setEditUser(null)}
//                       >
//                         Cancel
//                       </button> */}
//                     </>
//                   ) : (
//                     <>
//                       {/* <button
//                         className="btn btn-warning me-2"
//                         onClick={() => startEditing(user)}
//                       >
//                         Edit
//                       </button> */}
//                       {/* <button
//                         className="btn btn-primary me-2"
//                         onClick={() => viewDetails(user)}
//                       >
//                         View
//                       </button> */}
//                       {/* <DeleteUser/> */}
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteUser(user.id)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Modal oynasi - Yangi qo'shish */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Yangi Foydalanuvchi Qo'shishhh</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   value={newUser.username}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, username: e.target.value })
//                   }
//                   placeholder="Username kiriting"
//                 />
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={newUser.password}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, password: e.target.value })
//                   }
//                   placeholder="Parol kiriting"
//                 />
//                  <input
//                   type="first_name"
//                   className="form-control"
//                   value={newUser.first_name}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, first_name: e.target.value })
//                   }
//                   placeholder="Ism: kiriting"
//                 />
//                  <input
//                   type="last_name"
//                   className="form-control"
//                   value={newUser.last_name}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, last_name: e.target.value })
//                   }
//                   placeholder="Familiya: kiriting"
//                 />
//                  <input
//                   type="email"
//                   className="form-control"
//                   value={newUser.email}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, email: e.target.value })
//                   }
//                   placeholder="Email: kiriting"
//                 />
//                  <input
//                   type="number"
//                   className="form-control"
//                   value={newUser.phone_number}
//                   onChange={(e) =>
//                     setNewUser({ ...newUser, phone_number: e.target.value })
//                   }
//                   placeholder="Telefon raqam: kiriting"
//                 />
                 
//               </div>
//               <div className="modal-footer">
//                 <button
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Bekor qilish
//                 </button>
//                 <button className="btn btn-primary" onClick={addUser}>
//                   Qo'shish
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

      
//     </div>
//   );
// }

// export default UsersComponent;


import { useState, useEffect } from "react";
import axios from "axios";
import DeleteUser from './deleteUser'
import { httpRequest } from "@services/axios.service";

import AddUserForm from "./AddUserFrom";
function UsersComponent() {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [editUser, setEditUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const data = await httpRequest.get('/users/')
      setData(data.results);
    } catch (error) {
      console.log({ error })
      setMessage("Foydalanuvchilarni olishda xatolik yuz berdi.");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Xabarni avtomatik yo'q qilish
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
      <AddUserForm/>
      <button onClick={showModal}>add</button>

      {/* Loader yoki jadval */}
      {loading ? (
        <p className="text-center">Yuklanmoqda...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Number</th>
              <th>User type</th>
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
                    user.email
                  )}
                </td>
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
                    user.first_name
                  )}
                </td>
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
                    user.last_name
                  )}
                </td>
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
                    user.phone_number
                  )}
                </td>
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
                    user.user_type
                  )}
                </td>
                <td className="text-center">
                  {editUser && editUser.id === user.id ? (
                    <>
                      {/* <button
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
                      </button> */}
                    </>
                  ) : (
                    <>
                      {/* <button
                        className="btn btn-warning me-2"
                        onClick={() => startEditing(user)}
                      >
                        Edit
                      </button> */}
                      {/* <button
                        className="btn btn-primary me-2"
                        onClick={() => viewDetails(user)}
                      >
                        View
                      </button> */}
                      {/* <DeleteUser/> */}
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
                <h5 className="modal-title">Yangi Foydalanuvchi Qo'shishhh</h5>
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
                 <input
                  type="first_name"
                  className="form-control"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                  placeholder="Ism: kiriting"
                />
                 <input
                  type="last_name"
                  className="form-control"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                  placeholder="Familiya: kiriting"
                />
                 <input
                  type="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Email: kiriting"
                />
                 <input
                  type="number"
                  className="form-control"
                  value={newUser.phone_number}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone_number: e.target.value })
                  }
                  placeholder="Telefon raqam: kiriting"
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

      
    </div>
  );
}

export default UsersComponent;


