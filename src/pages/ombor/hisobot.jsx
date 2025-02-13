import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OmborHisoboti = () => {
    const [omborData, setOmborData] = useState([]);

    useEffect(() => {
        axios.get("https://crmapimilk.pythonanywhere.com/ombor-hisoboti/")
            .then(response => {
                console.log("API dan kelgan ma'lumot:", response.data); // 🔍 Ma'lumotni tekshirish
                setOmborData(response.data);
            })
            .catch(error => {
                console.error("Ma'lumot olishda xatolik:", error);
            });
    }, []);
    

    const chartData = {
        labels: omborData.map(item => item.mahsulot_nomi),
        datasets: [
            {
                label: "Mahsulotlar soni",
                data: omborData.map(item => item.soni),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            title: { display: true, text: "Ombordagi Mahsulotlar Hisoboti" },
        },
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">📊 Ombor Hisoboti</h2>
            <div style={{ height: "400px" }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default OmborHisoboti;
