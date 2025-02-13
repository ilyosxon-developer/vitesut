// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function MahsulotlarComponent() {
//   const [data, setData] = useState([]);
//   const [newMahsulot, setNewMahsulot] = useState("");
//   const [editMahsulot, setEditMahsulot] = useState(null);
//   const [viewMahsulot, setViewMahsulot] = useState(null);
//   const [message, setMessage] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchMahsulotlar();
//   }, []);

//   const fetchMahsulotlar = () => {
//     axios
//       .get("https://crmapimilk.pythonanywhere.com/mahsulotlar/")
//       .then((response) => {
//         setData(response.data.results);
//       })
//       .catch((error) => {
//         console.error("Mahsulotlarni olishda xato:", error);
//         setMessage("Mahsulotlarni olishda xatolik yuz berdi.");
//       });
//   };

//   const addMahsulot = () => {
//     if (!newMahsulot.trim()) {
//       setMessage("Mahsulot nomini kiriting!");
//       return;
//     }

//     axios
//       .post("https://crmapimilk.pythonanywhere.com/mahsulotlar/", { name: newMahsulot })
//       .then((response) => {
//         setMessage("Yangi mahsulot qo'shildi!");
//         setData((prevData) => [...prevData, response.data]);
//         setNewMahsulot("");
//         setShowModal(false);
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.message}`);
//       });
//   };

//   const deleteMahsulot = (id) => {
//     axios
//       .delete(`https://crmapimilk.pythonanywhere.com/mahsulotlar/${id}/`)
//       .then(() => {
//         setMessage(`Mahsulot muvaffaqiyatli o'chirildi!`);
//         setData((prevData) => prevData.filter((mahsulot) => mahsulot.id !== id));
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.message}`);
//       });
//   };

//   const startEditing = (mahsulot) => {
//     setEditMahsulot(mahsulot);
//   };

//   const saveEdit = () => {
//     if (!editMahsulot.name.trim()) {
//       setMessage("Mahsulot nomi bo'sh bo'lishi mumkin emas!");
//       return;
//     }

//     axios
//       .put(`https://crmapimilk.pythonanywhere.com/mahsulotlar/${editMahsulot.id}/`, {
//         name: editMahsulot.name,
//       })
//       .then((response) => {
//         setMessage("Mahsulot muvaffaqiyatli tahrirlandi!");
//         setData((prevData) =>
//           prevData.map((mahsulot) =>
//             mahsulot.id === editMahsulot.id ? response.data : mahsulot
//           )
//         );
//         setEditMahsulot(null);
//       })
//       .catch((error) => {
//         setMessage(`Xatolik: ${error.message}`);
//       });
//   };

//   const viewDetails = (mahsulot) => {
//     setViewMahsulot(mahsulot);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Mahsulotlar</h1>

//       {message && (
//         <div className="alert alert-info text-center" role="alert">
//           {message}
//         </div>
//       )}

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
//           {data.map((mahsulot) => (
//             <tr key={mahsulot.id}>
//               <td>{mahsulot.id}</td>
//               <td>
//                 {editMahsulot && editMahsulot.id === mahsulot.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editMahsulot.name}
//                     onChange={(e) =>
//                       setEditMahsulot({ ...editMahsulot, name: e.target.value })
//                     }
//                   />
//                 ) : (
//                   mahsulot.name
//                 )}
//               </td>
//               <td className="text-center">
//                 {editMahsulot && editMahsulot.id === mahsulot.id ? (
//                   <>
//                     <button className="btn btn-success me-2" onClick={saveEdit}>
//                       Save
//                     </button>
//                     <button
//                       className="btn btn-secondary"
//                       onClick={() => setEditMahsulot(null)}
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className="btn btn-warning me-2"
//                       onClick={() => startEditing(mahsulot)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-primary me-2"
//                       onClick={() => viewDetails(mahsulot)}
//                     >
//                       View
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => deleteMahsulot(mahsulot.id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default MahsulotlarComponent;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Spinner } from "react-bootstrap";

const API_BASE_URL = "https://crmapimilk.pythonanywhere.com";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Tokenni olish
      const response = await axios.get(`${API_BASE_URL}/mahsulotlar/`, {
        headers: {
          Authorization: `Bearer ${token}`, // Token qo'shish
          Accept: "application/json",
        },
      });
      setProducts(response.data.results);
    } catch (err) {
      setError("Mahsulotlarni yuklashda xatolik!");
      console.error("Mahsulotlarni yuklashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Mahsulotlar</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomi</th>
              <th>SKU</th>
              <th>Narxi</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.narx} $</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Hech qanday mahsulot topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Products;
