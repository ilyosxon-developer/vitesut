import React, { useState, useEffect } from "react";
import { createPurchase, fetchPurchases } from "../../lib/purchase";
import { fetchOmborlar } from "../../lib/ombor";


const AddPurchaseForm = () => {
  const [sana, setSana] = useState("");
  const [yetkazibBeruvchi, setYetkazibBeruvchi] = useState("");
  const [status, setStatus] = useState("");
  const [totalSum, setTotalSum] = useState("");
  const [omborlar, setOmborlar] = useState([]);
  const [selectedOmbor, setSelectedOmbor] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Ombor va xaridlarni yuklash
  useEffect(() => {
    fetchOmborlar()
      .then((response) => {
        setOmborlar(response.data.results);
      })
      .catch((error) => {
        console.error("Omborlarni olishda xatolik:", error);
      });

    loadPurchases();
  }, []);

  // Xaridlarni yuklash
  const loadPurchases = () => {
    fetchPurchases()
      .then((response) => {
        setPurchases(response.data.results);
      })
      .catch((error) => {
        console.error("Xaridlarni olishda xatolik:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const purchaseData = {
      sana,
      yetkazib_beruvchi: yetkazibBeruvchi,
      status,
      total_sum: totalSum,
      ombor: selectedOmbor,
    };

    try {
      const response = await createPurchase(purchaseData);
      console.log("Xarid muvaffaqiyatli qo‘shildi:", response.data);

      // Yangi qo‘shilgan xaridni listga qo‘shish
      setPurchases((prev) => [response.data, ...prev]);

      setLoading(false);
      setModalOpen(true);

      // Formani tozalash
      setSana("");
      setYetkazibBeruvchi("");
      setStatus("");
      setTotalSum("");
      setSelectedOmbor("");
    } catch (error) {
      console.error("Xarid qo‘shishda xatolik:", error.response);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Yangi Xarid Qo‘shish</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Ombor:</label>
            <select
              className="form-select"
              value={selectedOmbor}
              onChange={(e) => setSelectedOmbor(e.target.value)}
              required
            >
              <option value="">Omborni tanlang</option>
              {omborlar.map((ombor) => (
                <option key={ombor.id} value={ombor.id}>
                  {ombor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Sana:</label>
            <input
              type="date"
              className="form-control"
              value={sana}
              onChange={(e) => setSana(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Yetkazib beruvchi:</label>
            <input
              type="text"
              className="form-control"
              value={yetkazibBeruvchi}
              onChange={(e) => setYetkazibBeruvchi(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status:</label>
            <input
              type="text"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Jami summa:</label>
          <input
            type="number"
            className="form-control"
            value={totalSum}
            onChange={(e) => setTotalSum(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span> Yuklanmoqda...
            </>
          ) : (
            "Saqlash"
          )}
        </button>
      </form>

      {/* Modal */}
      {modalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Xabar</h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <p>Xarid muvaffaqiyatli qo‘shildi!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Yopish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Qo‘shilgan Xaridlar Ro‘yxati */}
      <div className="mt-4">
        <h4>Qo‘shilgan Xaridlar</h4>
        <table className="table table-bordered mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Ombor</th>
              <th>Yetkazib beruvchi</th>
              <th>Sana</th>
              <th>Status</th>
              <th>Jami Summa</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={purchase.id}>
                <td>{index + 1}</td>
                <td>{purchase.ombor_name}</td>
                <td>{purchase.yetkazib_beruvchi}</td>
                <td>{purchase.sana}</td>
                <td>{purchase.status}</td>
                <td>{purchase.total_sum} UZS</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPurchaseForm;
