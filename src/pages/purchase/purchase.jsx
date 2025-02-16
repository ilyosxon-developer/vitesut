// BirliklarComponentt.jsx
import React, { useState, useEffect } from "react";
import {
  fetchBirliklar,
  createBirliklar,
  deleteBirliklar,
  updateBirliklar,
  fetchOmborlar, // Yangi: omborlarni olish uchun API
} from "../../lib/purchase";
import AddPurchaseForm from "./add-purchase";
function Purchase() {
  const [data, setData] = useState([]);
  const [newPurchase, setNewPurchase] = useState({
    ombor: "", // Ombor IDsi saqlanadi
    sana: "",
    yetkazib_beruvchi: "",
    status: "",
  });
  const [editBirlik, setEditBirlik] = useState(null);
  const [viewBirlik, setViewBirlik] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [omborlar, setOmborlar] = useState([]); // Yangi: omborlar ro'yxati

  useEffect(() => {
    loadBirliklar();
    loadOmborlar(); // Omborlarni yuklash
  }, []);

  const loadBirliklar = () => {
    fetchBirliklar()
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        console.error("Birliklarni olishda xato:", error);
        setMessage("Birliklarni olishda xatolik yuz berdi.");
      });
  };

  const loadOmborlar = () => {
    fetchOmborlar()
      .then((response) => {
        setOmborlar(response.data.results); // Backenddan kelgan omborlar ro'yxatini saqlash
      })
      .catch((error) => {
        console.error("Omborlarni olishda xato:", error);
        setMessage("Omborlarni olishda xatolik yuz berdi.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPurchase((prevPurchase) => ({
      ...prevPurchase,
      [name]: value,
    }));
  };

  const addBirlikHandler = () => {
    if (
      !newPurchase.ombor.trim() ||
      !newPurchase.sana.trim() ||
      !newPurchase.yetkazib_beruvchi.trim() ||
      !newPurchase.status.trim()
    ) {
      setMessage("Barcha maydonlarni to'ldiring!");
      return;
    }

    createPurchase(newPurchase)
      .then((response) => {
        setMessage("Yangi birlik qo'shildi!");
        setData((prevData) => [...prevData, response.data]);
        setNewPurchase({ ombor: "", sana: "", yetkazib_beruvchi: "", status: "" });
        setShowModal(false);
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.message}`);
      });
  };

  const deleteBirlikHandler = (id) => {
    deleteBirlik(id)
      .then(() => {
        setMessage("Birlik muvaffaqiyatli o'chirildi!");
        setData((prevData) => prevData.filter((birlik) => birlik.id !== id));
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.message}`);
      });
  };

  const startEditing = (birlik) => {
    setEditBirlik(birlik);
  };

  const saveEdit = () => {
    if (
      !editBirlik.ombor.trim() ||
      !editBirlik.sana.trim() ||
      !editBirlik.yetkazib_beruvchi.trim() ||
      !editBirlik.status.trim()
    ) {
      setMessage("Barcha maydonlarni to'ldiring!");
      return;
    }

    updateBirlik(editBirlik.id, editBirlik)
      .then((response) => {
        setMessage("Birlik muvaffaqiyatli tahrirlandi!");
        setData((prevData) =>
          prevData.map((birlik) =>
            birlik.id === editBirlik.id ? response.data : birlik
          )
        );
        setEditBirlik(null);
      })
      .catch((error) => {
        setMessage(`Xatolik: ${error.message}`);
      });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditBirlik((prevBirlik) => ({
      ...prevBirlik,
      [name]: value,
    }));
  };

  const viewDetails = (birlik) => {
    setViewBirlik(birlik);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Birliklar</h1>

      {message && (
        <div className="alert alert-info text-center" role="alert">
          {message}
        </div>
      )}

      <div className="mb-4 text-end">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add
        </button>
      </div>
      <AddPurchaseForm/>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Ombor</th>
            <th>Sana</th>
            <th>Yetkazib beruvchi</th>
            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((birlik) => (
            <tr key={birlik.id}>
              <td>{birlik.id}</td>
              <td>
                {editBirlik && editBirlik.id === birlik.id ? (
                  <select
                    className="form-select"
                    name="ombor"
                    value={editBirlik.ombor}
                    onChange={handleEditInputChange}
                  >
                    <option value="">Tanlang</option>
                    {omborlar.map((ombor) => (
                      <option key={ombor.id} value={ombor.id}>
                        {ombor.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Ombor nomini ko'rsatish uchun
                  omborlar.find((ombor) => ombor.id === birlik.ombor)?.name || "N/A"
                )}
              </td>
              <td>
                {editBirlik && editBirlik.id === birlik.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="sana"
                    value={editBirlik.sana}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  birlik.sana
                )}
              </td>
              <td>
                {editBirlik && editBirlik.id === birlik.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="yetkazib_beruvchi"
                    value={editBirlik.yetkazib_beruvchi}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  birlik.yetkazib_beruvchi
                )}
              </td>
              <td>
                {editBirlik && editBirlik.id === birlik.id ? (
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    value={editBirlik.status}
                    onChange={handleEditInputChange}
                  />
                ) : (
                  birlik.status
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
                <div className="mb-3">
                  <label className="form-label">Ombor:</label>
                  <select
                    className="form-select"
                    name="ombor"
                    value={newPurchase.ombor}
                    onChange={handleInputChange}
                  >
                    <option value="">Tanlang</option>
                    {omborlar.map((ombor) => (
                      <option key={ombor.id} value={ombor.id}>
                        {ombor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Sana:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sana"
                    value={newPurchase.sana}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Yetkazib beruvchi:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="yetkazib_beruvchi"
                    value={newPurchase.yetkazib_beruvchi}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="status"
                    value={newPurchase.status}
                    onChange={handleInputChange}
                  />
                </div>
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
                  <strong>Ombor:</strong>{" "}
                  {omborlar.find((ombor) => ombor.id === viewBirlik.ombor)?.name || "N/A"}
                </p>
                <p>
                  <strong>Sana:</strong> {viewBirlik.sana}
                </p>
                <p>
                  <strong>Yetkazib Beruvchi:</strong> {viewBirlik.yetkazib_beruvchi}
                </p>
                <p>
                  <strong>Status:</strong> {viewBirlik.status}
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

export default Purchase;

