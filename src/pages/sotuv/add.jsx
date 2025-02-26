import React, { useState, useEffect } from "react";
import axios from "axios";

function SotuvForm() {
  const [sana, setSana] = useState("");
  const [fromOmbor, setFromOmbor] = useState([]);
  const [toOmbor, setToOmbor] = useState([]);
  const [selectedFromOmbor, setSelectedFromOmbor] = useState("");
  const [selectedToOmbor, setSelectedToOmbor] = useState("");
  const [sotibOluvchi, setSotibOluvchi] = useState("admin");
  const [mahsulotlar, setMahsulotlar] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
     
  useEffect(() => {
    axios.get("/api/ombor/from").then((res) => setFromOmbor(res.data));
    axios.get("/api/ombor/to").then((res) => setToOmbor(res.data));
  }, []);

  useEffect(() => {
    const sum = mahsulotlar.reduce((acc, item) => acc + item.narx * item.miqdor, 0);
    setTotalSum(sum);
  }, [mahsulotlar]);

  const addMahsulot = () => {
    setMahsulotlar([...mahsulotlar, { nom: "", narx: 0, miqdor: 1 }]);
  };

  const updateMahsulot = (index, key, value) => {
    const newMahsulotlar = [...mahsulotlar];
    newMahsulotlar[index][key] = value;
    setMahsulotlar(newMahsulotlar);
  };

  const removeMahsulot = (index) => {
    setMahsulotlar(mahsulotlar.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const sotuvData = {
      sana,
      from_ombor: selectedFromOmbor,
      to_ombor: selectedToOmbor,
      sotib_oluvchi: sotibOluvchi,
      total_sum: totalSum,
      mahsulotlar,
    };
    axios.post("/api/sotuv", sotuvData).then((res) => console.log("Sotuv muvaffaqiyatli!", res));
  };

  return (
    <div>
      <label>Sana:</label>
      <input type="date" value={sana} onChange={(e) => setSana(e.target.value)} />
      
      <label>From ombor:</label>
      <select onChange={(e) => setSelectedFromOmbor(e.target.value)}>
        {fromOmbor.map((o) => (
          <option key={o.id} value={o.id}>{o.nom}</option>
        ))}
      </select>
      
      <label>To ombor:</label>
      <select onChange={(e) => setSelectedToOmbor(e.target.value)}>
        {toOmbor.map((o) => (
          <option key={o.id} value={o.id}>{o.nom}</option>
        ))}
      </select>
      
      <label>Sotib oluvchi:</label>
      <select onChange={(e) => setSotibOluvchi(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="diller">Diller</option>
        <option value="client">Client</option>
      </select>
      
      <label>Mahsulotlar:</label>
      {mahsulotlar.map((m, index) => (
        <div key={index}>
          <input type="text" placeholder="Mahsulot nomi" value={m.nom} onChange={(e) => updateMahsulot(index, "nom", e.target.value)} />
          <input type="number" placeholder="Narx" value={m.narx} onChange={(e) => updateMahsulot(index, "narx", Number(e.target.value))} />
          <input type="number" placeholder="Miqdor" value={m.miqdor} onChange={(e) => updateMahsulot(index, "miqdor", Number(e.target.value))} />
          <button onClick={() => removeMahsulot(index)}>❌</button>
        </div>
      ))}
      <button onClick={addMahsulot}>+ Mahsulot Qo'shish</button>
      
      <h3>Total Sum: {totalSum}</h3>
      <button onClick={handleSubmit}>POST</button>
    </div>
  );
}

export default SotuvForm;
