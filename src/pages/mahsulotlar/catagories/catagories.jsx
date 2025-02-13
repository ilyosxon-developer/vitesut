import React, { useState, useEffect } from "react";
import axios from "axios";

function Catagories() {
  const [data, setData] = useState([]);
  const [newKategoriya, setNewKategoriya] = useState("");
  const [editKategoriya, setEditKategoriya] = useState(null);
  const [viewKategoriya, setViewKategoriya] = useState(null);
  const [deleteKategoriyaId, setDeleteKategoriyaId] = useState(null);
  const [message, setMessage] = useState("");
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchKategoriyalar();
  }, []);

  const fetchKategoriyalar = () => {
    axios
      .get("https://crmapimilk.pythonanywhere.com/kategoriyalar/")
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error("Kategoriyalarni olishda xato:", error);
      });
  };

  const addKategoriya = () => {
    if (!newKategoriya.trim()) return;

    axios.post("https://crmapimilk.pythonanywhere.com/kategoriyalar/", { name: newKategoriya })
      .then(response => {
        setData([...data, response.data]);
        setShowAddModal(false);
      });
  };

  const saveEdit = () => {
    if (!editKategoriya.name.trim()) return;

    axios.patch(`https://crmapimilk.pythonanywhere.com/kategoriyalar/${editKategoriya.id}/`, {
        name: editKategoriya.name,
      })
      .then(response => {
        setData(data.map(k => k.id === editKategoriya.id ? response.data : k));
        setShowEditModal(false);
      });
  };

  const confirmDelete = () => {
    axios.delete(`https://crmapimilk.pythonanywhere.com/kategoriyalar/${deleteKategoriyaId}/`)
      .then(() => {
        setData(data.filter(k => k.id !== deleteKategoriyaId));
        setShowDeleteModal(false);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Kategoriyalar</h1>
      <button className="btn btn-success" onClick={() => setShowAddModal(true)}>+ Add</button>
      <table className="table table-bordered mt-3">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Action</th></tr>
        </thead>
        <tbody>
          {data.map((kategoriya) => (
            <tr key={kategoriya.id}>
              <td>{kategoriya.id}</td>
              <td>{kategoriya.name}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => { setEditKategoriya(kategoriya); setShowEditModal(true); }}>Edit</button>
                <button className="btn btn-primary me-2" onClick={() => { setViewKategoriya(kategoriya); setShowViewModal(true); }}>View</button>
                <button className="btn btn-danger" onClick={() => { setDeleteKategoriyaId(kategoriya.id); setShowDeleteModal(true); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Add Modal */}
      {showAddModal && (
        <div className="modal d-block">
          <div className="modal-content">
            <h2>Add Kategoriya</h2>
            <input type="text" value={newKategoriya} onChange={(e) => setNewKategoriya(e.target.value)} />
            <button onClick={addKategoriya}>Save</button>
            <button onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal d-block">
          <div className="modal-content">
            <h2>Edit Kategoriya</h2>
            <input type="text" value={editKategoriya.name} onChange={(e) => setEditKategoriya({ ...editKategoriya, name: e.target.value })} />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && (
        <div className="modal d-block">
          <div className="modal-content">
            <h2>View Kategoriya</h2>
            <p>ID: {viewKategoriya.id}</p>
            <p>Name: {viewKategoriya.name}</p>
            <button onClick={() => setShowViewModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal d-block">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Haqiqatan ham o'chirmoqchimisiz?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catagories;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function KategoriyalarComponent() {
//   const [data, setData] = useState([]);
//   const [newKategoriya, setNewKategoriya] = useState("");
//   const [message, setMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [editModal, setEditModal] = useState(false);
//   const [viewModal, setViewModal] = useState(false);
//   const [selectedKategoriya, setSelectedKategoriya] = useState(null);
//   const [editedName, setEditedName] = useState("");

//   useEffect(() => {
//     fetchKategoriyalar();
//   }, []);

//   const fetchKategoriyalar = () => {
//     axios
//       .get("https://crmapimilk.pythonanywhere.com/kategoriyalar/")
//       .then((response) => {
//         setData(response.data.results);
//       })
//       .catch((error) => {
//         console.error("Kategoriyalarni olishda xato:", error);
//         setMessage("Kategoriyalarni olishda xatolik yuz berdi.");
//       });
//   };

//   const addKategoriya = () => {
//     if (!newKategoriya.trim()) {
//       setMessage("Kategoriya nomini kiriting!");
//       return;
//     }

//     axios
//       .post("https://crmapimilk.pythonanywhere.com/kategoriyalar/", { name: newKategoriya })
//       .then((response) => {
//         setMessage("Yangi kategoriya qo'shildi!");
//         setData((prevData) => [...prevData, response.data]);
//         setNewKategoriya("");
//         setShowModal(false);
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.message}`);
//       });
//   };

//   const deleteKategoriya = () => {
//     if (!selectedKategoriya) return;

//     axios
//       .delete(`https://crmapimilk.pythonanywhere.com/kategoriyalar/${selectedKategoriya.id}/`)
//       .then(() => {
//         setMessage("Kategoriya o'chirildi!");
//         setData((prevData) => prevData.filter((item) => item.id !== selectedKategoriya.id));
//         setDeleteModal(false);
//       })
//       .catch((error) => {
//         setMessage(`O‘chirishda xatolik: ${error.message}`);
//       });
//   };

//   const editKategoriya = () => {
//     if (!selectedKategoriya || !editedName.trim()) return;

//     axios
//       .put(`https://crmapimilk.pythonanywhere.com/kategoriyalar/${selectedKategoriya.id}/`, { name: editedName })
//       .then(() => {
//         setMessage("Kategoriya yangilandi!");
//         setData((prevData) =>
//           prevData.map((item) => (item.id === selectedKategoriya.id ? { ...item, name: editedName } : item))
//         );
//         setEditModal(false);
//       })
//       .catch((error) => {
//         setMessage(`Tahrirlashda xatolik: ${error.message}`);
//       });
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Kategoriyalar</h1>

//       {message && <div className="alert alert-info text-center">{message}</div>}

//       <div className="mb-4 text-end">
//         <button className="btn btn-success" onClick={() => setShowModal(true)}>
//           + Add
//         </button>
//       </div>

//       <table className="table table-bordered table-hover">
//         <thead className="table-light">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th className="text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((kategoriya) => (
//             <tr key={kategoriya.id}>
//               <td>{kategoriya.id}</td>
//               <td>{kategoriya.name}</td>
//               <td className="text-center">
//                 <button
//                   className="btn btn-primary me-2"
//                   onClick={() => {
//                     setSelectedKategoriya(kategoriya);
//                     setViewModal(true);
//                   }}
//                 >
//                   View
//                 </button>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() => {
//                     setSelectedKategoriya(kategoriya);
//                     setEditedName(kategoriya.name);
//                     setEditModal(true);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => {
//                     setSelectedKategoriya(kategoriya);
//                     setDeleteModal(true);
//                   }}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Yangi kategoriya qo‘shish modal */}
//       {showModal && (
//         <div className="modal fade show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Yangi Kategoriya Qo‘shish</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={newKategoriya}
//                   onChange={(e) => setNewKategoriya(e.target.value)}
//                   placeholder="Yangi kategoriya nomini kiriting"
//                 />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                   Bekor qilish
//                 </button>
//                 <button className="btn btn-primary" onClick={addKategoriya}>
//                   Qo‘shish
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit modal */}
//       {editModal && (
//         <div className="modal fade show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Kategoriya Tahrirlash</h5>
//                 <button type="button" className="btn-close" onClick={() => setEditModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={editedName}
//                   onChange={(e) => setEditedName(e.target.value)}
//                 />
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setEditModal(false)}>
//                   Bekor qilish
//                 </button>
//                 <button className="btn btn-warning" onClick={editKategoriya}>
//                   Yangilash
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View modal */}
//       {viewModal && selectedKategoriya && (
//         <div className="modal fade show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Kategoriya Tafsilotlari</h5>
//                 <button type="button" className="btn-close" onClick={() => setViewModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <p><strong>ID:</strong> {selectedKategoriya.id}</p>
//                 <p><strong>Nomi:</strong> {selectedKategoriya.name}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default KategoriyalarComponent;
