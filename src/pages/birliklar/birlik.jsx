  // BirliklarComponentt.jsx
  import React, { useState, useEffect } from "react";
  import { showMessage } from "../../utilities/showMessage";
  import {
    fetchBirliklar,
    createBirlik,
    deleteBirlik,
    updateBirlik,
  } from "../../lib/unity"; // API funksiyalarini import qilish
  // API funksiyalarini import qilamiz

  function Birlik() {
    const [data, setData] = useState([]);
    const [newBirlik, setNewBirlik] = useState("");
    const [editBirlik, setEditBirlik] = useState(null);
    const [viewBirlik, setViewBirlik] = useState(null); // Tafsilotlarni ko'rish uchun
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
   
    useEffect(() => {
      loadBirliklar();
    }, []);

    const loadBirliklar = () => {
      fetchBirliklar()
      
        .then((response) => {
          // Backend javob formatiga qarab, masalan: response.data.results
          setData(response.data.results);
        })
        .catch((error) => {
          console.error("Birliklarni olishda xato:", error);
          setMessage("Birliklarni olishda xatolik yuz berdi.");
        });
    };


    const addBirlikHandler = () => {
      if (!newBirlik.trim()) {
        showMessage(setMessage, "Birlik nomini kiriting!");
        return;
      }
    
      createBirlik(newBirlik)
        .then((response) => {
          showMessage(setMessage, "Yangi birlik qo'shildi!");
          setData((prevData) => [...prevData, response.data]);
          setNewBirlik("");
          setShowModal(false);
        })
        .catch((error) => {
          showMessage(setMessage, `Xatolik: ${error.message}`);
        });
    };
    
    const deleteBirlikHandler = (id) => {
      deleteBirlik(id)
        .then(() => {
          showMessage(setMessage, "Birlik muvaffaqiyatli o'chirildi!");
          setData((prevData) => prevData.filter((birlik) => birlik.id !== id));
        })
        .catch((error) => {
          showMessage(setMessage, `Xatolik: ${error.message}`);
        });
    };
    
    const saveEdit = () => {
      if (!editBirlik.name.trim()) {
        showMessage(setMessage, "Birlik nomi bo'sh bo'lishi mumkin emas!");
        return;
      }
    
      updateBirlik(editBirlik.id, editBirlik.name)
        .then((response) => {
          showMessage(setMessage, "Birlik muvaffaqiyatli tahrirlandi!");
          setData((prevData) =>
            prevData.map((birlik) =>
              birlik.id === editBirlik.id ? response.data : birlik
            )
          );
          setEditBirlik(null);
        })
        .catch((error) => {
          showMessage(setMessage, `Xatolik: ${error.message}`);
        });
    };
    


const startEditing = (birlik) => {
  setEditBirlik(birlik);
};

    const viewDetails = (birlik) => {
      setViewBirlik(birlik);
    };

    return (
      <div className="container">
        <h1 className="text-center mb-4">Birliklar</h1>

        {/* Xabar */}
        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        {/* Yangi birlik qo'shish tugmasi */}
        <div className="mb-4 text-end">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            + Add
          </button>
        </div>

        {/* Jadval */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((birlik) => (
              <tr key={birlik.id}>
                <td>{birlik.id}</td>
                <td>
                  {editBirlik && editBirlik.id === birlik.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editBirlik.name}
                      onChange={(e) =>
                        setEditBirlik({ ...editBirlik, name: e.target.value })
                      }
                    />
                  ) : (
                    birlik.name
                  )}
                </td>
                <td className="text-center">
                  {editBirlik && editBirlik.id === birlik.id ? (
                    <>
                      <button className="btn btn-success me-2" onClick={saveEdit}>
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => setEditBirlik(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => startEditing(birlik)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => viewDetails(birlik)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteBirlikHandler(birlik.id)}
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

        {/* Modal oynasi - Yangi qo'shish */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Yangi Birlik Qo'shish</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={newBirlik}
                    onChange={(e) => setNewBirlik(e.target.value)}
                    placeholder="Yangi birlik nomini kiriting"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Bekor qilish
                  </button>
                  <button className="btn btn-primary" onClick={addBirlikHandler}>
                    Qo'shish
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal oynasi - Tafsilotlarni ko'rish */}
        {viewBirlik && (
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Birlik Tafsilotlari</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setViewBirlik(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>ID:</strong> {viewBirlik.id}
                  </p>
                  <p>
                    <strong>Nom:</strong> {viewBirlik.name}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setViewBirlik(null)}
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

  export default Birlik;
