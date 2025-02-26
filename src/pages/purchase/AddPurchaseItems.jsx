import React, { useState, useEffect } from "react";
import { fetchMahsulotlar } from "../../lib/mahsulotlar";
import { AiOutlineDelete } from "react-icons/ai"; // O'chirish ikonkasi

const AddPurchaseItems = () => {
  const [items, setItems] = useState([
    { id: Date.now(), selectedMahsulot: "", soni: "", narxi: "" }
  ]);
  const [mahsulotlar, setMahsulotlar] = useState([]);

  useEffect(() => {
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
    <div>
      <div className="w-100 text-end">
      <button className="btn btn-primary mb-3 p-4 pt-2 pb-2" onClick={handleAddItem}>
       +
      </button>
      </div>
      {items.map(({ id, selectedMahsulot, soni, narxi }) => (
      <div key={id} className="mb-3 border p-3 rounded">
      <div className="d-flex align-items-end gap-3 flex-wrap">
        <div className="flex-grow-1">
          <label className="form-label">Mahsulot:</label>
          <select
            className="form-select"
            value={selectedMahsulot}
            onChange={e => handleItemChange(id, 'selectedMahsulot', e.target.value)}
            required
          >
            <option value="">Mahsulotni tanlang</option>
            {mahsulotlar.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <div className="col-2">
          <label className="form-label">Soni:</label>
          <input
            type="number"
            className="form-control"
            value={soni}
            onChange={e => handleItemChange(id, 'soni', parseFloat(e.target.value) || '')}
            min="1"
            required
          />
        </div>
        <div className="col-2">
          <label className="form-label">Narxi:</label>
          <input
            type="number"
            className="form-control"
            value={narxi}
            onChange={e => handleItemChange(id, 'narxi', parseFloat(e.target.value) || '')}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="col-auto align-self-end">
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveItem(id)}
            disabled={items.length === 1}
          > <AiOutlineDelete/>
          </button>
        </div>
      </div>
    </div>
    
    
      ))}

     
    </div>
  );
};

export default AddPurchaseItems;
