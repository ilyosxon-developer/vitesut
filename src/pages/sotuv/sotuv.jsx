//   // BirliklarComponentt.jsx
//   import React, { useState, useEffect } from "react";
//   import SotuvForm from "./add";
//   import {
//     fetchBirliklar,
//     createBirlik,
//     deleteBirlik,
//     updateBirlik,
//   } from "../../lib/sotuv"; // API funksiyalarini import qilish
//   // API funksiyalarini import qilamiz

//   function Sotuv() {
//     const [data, setData] = useState([]);
//     const [newBirlik, setNewBirlik] = useState("");
//     const [editBirlik, setEditBirlik] = useState(null);
//     const [viewBirlik, setViewBirlik] = useState(null); // Tafsilotlarni ko'rish uchun
//     const [message, setMessage] = useState("");
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//       loadBirliklar();
//     }, []);

//     const loadBirliklar = () => {
//       fetchBirliklar()
      
//         .then((response) => {
//           // Backend javob formatiga qarab, masalan: response.data.results
//           setData(response.data.results);
//         })
//         .catch((error) => {
//           console.error("Birliklarni olishda xato:", error);
//           setMessage("Birliklarni olishda xatolik yuz berdi.");
//         });
//     };

//     const addBirlikHandler = () => {
//       if (!newBirlik.trim()) {
//         setMessage("Birlik nomini kiriting!");
//         return;
//       }

//       createBirlik(newBirlik)
//         .then((response) => {
//           setMessage("Yangi birlik qo'shildi!");
//           setData((prevData) => [...prevData, response.data]);
//           setNewBirlik("");
//           setShowModal(false);
//         })
//         .catch((error) => {
//           setMessage(`Xatolik: ${error.message}`);
//         });
//     };

//     const deleteBirlikHandler = (id) => {
//       deleteBirlik(id)
//         .then(() => {
//           setMessage("Birlik muvaffaqiyatli o'chirildi!");
//           setData((prevData) => prevData.filter((birlik) => birlik.id !== id));
//         })
//         .catch((error) => {
//           setMessage(`Xatolik: ${error.message}`);
//         });
//     };

//     const startEditing = (birlik) => {
//       setEditBirlik(birlik);
//     };

//     const saveEdit = () => {
//       if (!editBirlik.name.trim()) {
//         setMessage("Birlik nomi bo'sh bo'lishi mumkin emas!");
//         return;
//       }

//       updateBirlik(editBirlik.id, editBirlik.name)
//         .then((response) => {
//           setMessage("Birlik muvaffaqiyatli tahrirlandi!");
//           setData((prevData) =>
//             prevData.map((birlik) =>
//               birlik.id === editBirlik.id ? response.data : birlik
//             )
//           );
//           setEditBirlik(null);
//         })
//         .catch((error) => {
//           setMessage(`Xatolik: ${error.message}`);
//         });
//     };

//     const viewDetails = (birlik) => {
//       setViewBirlik(birlik);
//     };

//     return (
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">Sotuvlar</h1>

//         {/* Xabar */}
//         {message && (
//           <div className="alert alert-info text-center" role="alert">
//             {message}
//           </div>
//         )}

//         {/* Yangi birlik qo'shish tugmasi */}
//         <div className="mb-4 text-end">
//           <button className="btn btn-success" onClick={() => setShowModal(true)}>
//             + Add
//           </button>
//         </div>
//         <SotuvForm />

//         {/* Jadval */}
//         <table className="table table-bordered table-hover">
//           <thead className="table-light">
//             <tr>
//               <th>ID</th>
//               <th>Sana</th>
//               <th>Summa</th>
//               <th>Kimdan</th>
//               <th>Qayerga</th>
//               <th>Oluvchi</th>
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((birlik) => (
//               <tr key={birlik.id}>
//                 <td>{birlik.id}</td>
//                 <td>
//                   {editBirlik && editBirlik.id === birlik.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editBirlik.name}
//                       onChange={(e) =>
//                         setEditBirlik({ ...editBirlik, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     birlik.sana
//                   )}
//                 </td>
//                 <td>
//                   {editBirlik && editBirlik.id === birlik.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editBirlik.name}
//                       onChange={(e) =>
//                         setEditBirlik({ ...editBirlik, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     birlik.total_sum
//                   )}
//                 </td>
//                 <td>
//   {editBirlik && editBirlik.id === birlik.id ? (
//     <input
//       type="text"
//       className="form-control"
//       value={editBirlik.name}
//       onChange={(e) =>
//         setEditBirlik({ ...editBirlik, name: e.target.value })
//       }
//     />
//   ) : (
//     birlik.from_ombor
//   )}
// </td>

//                 <td>
//                   {editBirlik && editBirlik.id === birlik.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editBirlik.name}
//                       onChange={(e) =>
//                         setEditBirlik({ ...editBirlik, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     birlik.to_ombor
//                   )}
//                 </td>
//                 <td>
//                   {editBirlik && editBirlik.id === birlik.id ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editBirlik.name}
//                       onChange={(e) =>
//                         setEditBirlik({ ...editBirlik, name: e.target.value })
//                       }
//                     />
//                   ) : (
//                     birlik.sotib_oluvchi
//                   )}
//                 </td>
//                 <td className="text-center">
//                   {editBirlik && editBirlik.id === birlik.id ? (
//                     <>
//                       <button className="btn btn-success me-2" onClick={saveEdit}>
//                         Save
//                       </button>
//                       <button
//                         className="btn btn-secondary"
//                         onClick={() => setEditBirlik(null)}
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         className="btn btn-warning me-2"
//                         onClick={() => startEditing(birlik)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-primary me-2"
//                         onClick={() => viewDetails(birlik)}
//                       >
//                         View
//                       </button>
//                       <button
//                         className="btn btn-danger"
//                         onClick={() => deleteBirlikHandler(birlik.id)}
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

//         {/* Modal oynasi - Yangi qo'shish */}
//         {showModal && (
//           <div
//             className="modal fade show"
//             style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Yangi Birlik Qo'shish</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={newBirlik}
//                     onChange={(e) => setNewBirlik(e.target.value)}
//                     placeholder="Yangi birlik nomini kiriting"
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Bekor qilish
//                   </button>
//                   <button className="btn btn-primary" onClick={addBirlikHandler}>
//                     Qo'shish
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal oynasi - Tafsilotlarni ko'rish */}
//         {viewBirlik && (
//           <div
//             className="modal fade show"
//             style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
//           >
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Birlik Tafsilotlari</h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setViewBirlik(null)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>
//                     <strong>ID:</strong> {viewBirlik.id}
//                   </p>
//                   <p>
//                     <strong>Nom:</strong> {viewBirlik.name}
//                   </p>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setViewBirlik(null)}
//                   >
//                     Yopish
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   export default Sotuv;
import React, { useState } from 'react';
import { Calendar, User, Mail, Send, Edit, Trash2, Plus, X, Database } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    sana: '',
    fish: '',
    kimdan: '',
    kimga: '',
    mazmun: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && formData.id) {
      setRecords(records.map(record => 
        record.id === formData.id ? formData : record
      ));
    } else {
      setRecords([...records, { ...formData, id: Date.now().toString() }]);
    }
    resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (record) => {
    setFormData(record);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Haqiqatan ham bu ma'lumotni o'chirmoqchimisiz?")) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      sana: '',
      fish: '',
      kimdan: '',
      kimga: '',
      mazmun: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1 d-flex align-items-center">
            <Database className="me-2" /> Ma'lumotlar boshqaruvi tizimi
          </span>
        </div>
      </nav>

      <div className="container content-wrapper">
        <div className="d-flex justify-content-end mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className={`btn ${showForm ? 'btn-danger' : 'btn-primary'} d-flex align-items-center`}
          >
            {showForm ? (
              <>
                <X className="me-2" size={20} />
                Yopish
              </>
            ) : (
              <>
                <Plus className="me-2" size={20} />
                Yangi ma'lumot
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">
                {isEditing ? "Ma'lumotni tahrirlash" : "Yangi ma'lumot qo'shish"}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Calendar size={18} />
                      </span>
                      <input
                        type="date"
                        name="sana"
                        value={formData.sana}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={18} />
                      </span>
                      <input
                        type="text"
                        name="fish"
                        value={formData.fish}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="F.I.SH"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>
                      <input
                        type="text"
                        name="kimdan"
                        value={formData.kimdan}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Kimdan"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Send size={18} />
                      </span>
                      <input
                        type="text"
                        name="kimga"
                        value={formData.kimga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Kimga"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <textarea
                    name="mazmun"
                    value={formData.mazmun}
                    onChange={handleChange}
                    rows={4}
                    className="form-control"
                    placeholder="Mazmuni"
                    required
                  />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-light"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isEditing ? "Saqlash" : "Qo'shish"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Sana</th>
                  <th>F.I.SH</th>
                  <th>Kimdan</th>
                  <th>Kimga</th>
                  <th>Mazmuni</th>
                  <th className="text-end">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.sana}</td>
                    <td>{record.fish}</td>
                    <td>{record.kimdan}</td>
                    <td>{record.kimga}</td>
                    <td>{record.mazmun}</td>
                    <td className="text-end">
                      <button
                        onClick={() => handleEdit(record)}
                        className="btn btn-sm btn-outline-primary me-2"
                        title="Tahrirlash"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="btn btn-sm btn-outline-danger"
                        title="O'chirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state">
                        <Database size={48} className="empty-state-icon" />
                        <p className="mb-0">Ma'lumotlar mavjud emas</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;