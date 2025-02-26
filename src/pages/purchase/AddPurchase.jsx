// import React, { useState, useEffect } from "react";
// import { createPurchase, fetchPurchases } from "../../lib/purchase";
// import { fetchOmborlar } from "../../lib/ombor";
// import { fetchMahsulotlar } from "../../lib/mahsulotlar";
// import { Link } from "react-router-dom";
// const AddPurchaseForm = () => {
//   const [sana, setSana] = useState("");
//   const [yetkazibBeruvchi, setYetkazibBeruvchi] = useState("");
//   const [status, setStatus] = useState("");
//   const [totalSum, setTotalSum] = useState("");
//   const [omborlar, setOmborlar] = useState([]);
//   const [selectedOmbor, setSelectedOmbor] = useState("");
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   //
//   const [selectedMahsulot, setSelectedMahsulot] = useState("");
//   const [soni, setSoni] = useState("");
//   const [narxi, setNarxi] = useState("");
//   const [mahsulotlar, setMahsulotlar] = useState([]);

//   // Ombor va xaridlarni yuklash
//   useEffect(() => {
//     fetchOmborlar()
//       .then((response) => {
//         setOmborlar(response.data.results);
//       })
//       .catch((error) => {
//         console.error("Omborlarni olishda xatolik:", error);
//       });

//     loadPurchases();
//   }, []);

//   // Xaridlarni yuklash
//   const loadPurchases = () => {
//     fetchPurchases()
//       .then((response) => {
//         setPurchases(response.data.results);
//       })
//       .catch((error) => {
//         console.error("Xaridlarni olishda xatolik:", error);
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const purchaseData = {
//       sana,
//       yetkazib_beruvchi: yetkazibBeruvchi,
//       status,
//       total_sum: totalSum,
//       ombor: selectedOmbor,
//     };

//     try {
//       const response = await createPurchase(purchaseData);
//       console.log("Xarid muvaffaqiyatli qo‘shildi:", response.data);

//       // Yangi qo‘shilgan xaridni listga qo‘shish
//       setPurchases((prev) => [response.data, ...prev]);

//       setLoading(false);
//       setModalOpen(true);

//       // Formani tozalash
//       setSana("");
//       setYetkazibBeruvchi("");
//       setStatus("");
//       setTotalSum("");
//       setSelectedOmbor("");
//     } catch (error) {
//       console.error("Xarid qo‘shishda xatolik:", error.response);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMahsulotlar()
//       .then(({ data }) => setMahsulotlar(data.results))
//       .catch(err => console.error("Mahsulotlarni olishda xatolik:", err));
//   }, []);


//   return (
//     <div className="container mt-4">
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Ombor:</label>
//             <select
//               className="form-select"
//               value={selectedOmbor}
//               onChange={(e) => setSelectedOmbor(e.target.value)}
//               required
//             >
//               <option value="">Omborni tanlang</option>
//               {omborlar.map((ombor) => (
//                 <option key={ombor.id} value={ombor.id}>
//                   {ombor.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Sana:</label>
//             <input
//               type="date"
//               className="form-control"
//               value={sana}
//               onChange={(e) => setSana(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label">Yetkazib beruvchi:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={yetkazibBeruvchi}
//               onChange={(e) => setYetkazibBeruvchi(e.target.value)}
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Status:</label>
//             <input
//               type="text"
//               className="form-control"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Jami summa:</label>
//           <input
//             type="number"
//             className="form-control"
//             value={totalSum}
//             onChange={(e) => setTotalSum(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//           {loading ? (
//             <>
//               <span className="spinner-border spinner-border-sm me-2"></span> Yuklanmoqda...
//             </>
//           ) : (
//             "Saqlash"
//           )}
//         </button>
//       </form>

//       {/* Modal */}
//       {modalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Xabar</h5>
//                 <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <p>Xarid muvaffaqiyatli qo‘shildi!</p>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
//                   Yopish
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Qo‘shilgan Xaridlar Ro‘yxati
//       <div className="mt-4">
//         <h4>Qo‘shilgan Xaridlar</h4>
//         <table className="table table-bordered mt-2">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Ombor</th>
//               <th>Yetkazib beruvchi</th>
//               <th>Sana</th>
//               <th>Status</th>
//               <th>Jami Summa</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchases.map((purchase, index) => (
//               <tr key={purchase.id}>
//                 <td>{index + 1}</td>
//                 <td>{purchase.ombor_name}</td>
//                 <td>{purchase.yetkazib_beruvchi}</td>
//                 <td>{purchase.sana}</td>
//                 <td>{purchase.status}</td>
//                 <td>{purchase.total_sum} UZS</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//     </div>
//   );
// };

// export default AddPurchaseForm;
import React, { useState, useEffect } from "react";
import { createPurchase, fetchPurchases } from "../../lib/purchase";
import { fetchOmborlar } from "../../lib/ombor";
import { fetchMahsulotlar } from "../../lib/mahsulotlar";
import { AiOutlineDelete } from "react-icons/ai";
import { motion } from "framer-motion";

const AddPurchaseForm = () => {
  const [step, setStep] = useState(1);
  const [sana, setSana] = useState("");
  const [yetkazibBeruvchi, setYetkazibBeruvchi] = useState("");
  const [status, setStatus] = useState("");
  const [totalSum, setTotalSum] = useState("");
  const [omborlar, setOmborlar] = useState([]);
  const [selectedOmbor, setSelectedOmbor] = useState("");
  const [items, setItems] = useState([
    { id: Date.now(), selectedMahsulot: "", soni: "", narxi: "" }
  ]);
  const [mahsulotlar, setMahsulotlar] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchOmborlar()
      .then((response) => setOmborlar(response.data.results))
      .catch((error) => console.error("Omborlarni olishda xatolik:", error));

    fetchMahsulotlar()
      .then(({ data }) => setMahsulotlar(data.results))
      .catch(err => console.error("Mahsulotlarni olishda xatolik:", err));
  }, []);

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), selectedMahsulot: "", soni: "", narxi: "" }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="modal-content p-4 border rounded shadow-sm bg-white">
        <div className="d-flex gap-3 mb-3">
          <button onClick={() => setStep(1)} className="btn btn-sm btn-primary">Form 1</button>
          <button onClick={() => setStep(2)} className="btn btn-sm btn-success">Form 2</button>
        </div>
        
        <motion.div
          key={step}
          initial={{ opacity: 0, x: step === 1 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: step === 1 ? 100 : -100 }}
          transition={{ duration: 0.4 }}
          className="w-100"
        >
          {step === 1 ? (
            <form className="mb-3">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Ombor:</label>
                  <select className="form-select" value={selectedOmbor} onChange={(e) => setSelectedOmbor(e.target.value)} required>
                    <option value="">Omborni tanlang</option>
                    {omborlar.map((ombor) => (
                      <option key={ombor.id} value={ombor.id}>{ombor.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Sana:</label>
                  <input type="date" className="form-control" value={sana} onChange={(e) => setSana(e.target.value)} required />
                </div>
              </div>
              <button type="button" className="btn btn-primary w-100" onClick={() => setStep(2)}>Keyingi</button>
            </form>
          ) : (
            <div>
              <button className="btn btn-primary mb-3" onClick={handleAddItem}>+</button>
              {items.map(({ id, selectedMahsulot, soni, narxi }) => (
                <div key={id} className="d-flex align-items-center gap-3 mb-2 border p-2 rounded">
                  <select className="form-select w-25" value={selectedMahsulot} onChange={e => handleItemChange(id, 'selectedMahsulot', e.target.value)} required>
                    <option value="">Mahsulotni tanlang</option>
                    {mahsulotlar.map(({ id, name }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>
                  <input type="number" className="form-control w-25" value={soni} onChange={e => handleItemChange(id, 'soni', parseFloat(e.target.value) || '')} min="1" required />
                  <input type="number" className="form-control w-25" value={narxi} onChange={e => handleItemChange(id, 'narxi', parseFloat(e.target.value) || '')} min="0" step="0.01" required />
                  <button className="btn btn-danger" onClick={() => handleRemoveItem(id)} disabled={items.length === 1}><AiOutlineDelete /></button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary w-100" onClick={() => setStep(1)}>Orqaga</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AddPurchaseForm;
