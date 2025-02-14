import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteUser() {
  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => setShowModal(true);
  const confirmDelete = () => {
    // O'chirish logikasi shu yerga qo'shiladi
    setShowModal(false);
  };
  const cancelDelete = () => setShowModal(false);

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Oʻchirishni tasdiqlang</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Haqiqatan ham ushbu elementni oʻchirib tashlamoqchimisiz?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Bekor qilish</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Ha, oʻchirish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteUser;
