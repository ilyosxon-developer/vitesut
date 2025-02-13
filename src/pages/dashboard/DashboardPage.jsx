// import { useQuery } from '@tanstack/react-query';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { products, transfers, payments } from '../../lib/api';
// import dayjs from 'dayjs';

// export default function DashboardPage() {
//   // useQuery funksiyalarini yangilash
//   const { data: productsData } = useQuery({
//     queryKey: ['products'],
//     queryFn: products.getAll,
//   });

//   const { data: transfersData } = useQuery({
//     queryKey: ['transfers'],
//     queryFn: transfers.getAll,
//   });

//   const { isLoading, error, data: paymentsData } = useQuery({
//     queryKey: ['payments'],
//     queryFn: payments.getAll,
//   });

//   let totalPayments = 0;
//   const paymentData = paymentsData?.data || [];

//   if (!isLoading && !error && paymentData.length) {
//     totalPayments = paymentData.reduce((acc, payment) => acc + (Number(payment.amount) || 0), 0);
//   }

//   // BarChart uchun ma'lumot tayyorlash
//   // const chartData = paymentData.map(payment => ({
//   //   name: dayjs(payment.date).format('DD MMM'),
//   //   amount: Number(payment.amount) || 0,
//   // }));
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         <div className="bg-white overflow-hidden shadow rounded-lg p-5">
//           <dl>
//             <dt className="text-sm font-medium text-gray-500 truncate">Total Payments</dt>
//             <dd className="text-lg font-semibold text-gray-900">
//               {isLoading ? 'Loading...' : error ? 'Error fetching data' : `$${totalPayments}`}
//             </dd>
//           </dl>
//         </div>
//       </div>

//       <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 mt-6">
//         <h2 className="text-xl font-semibold text-gray-900">Payments Over Time</h2>

//         {isLoading ? (
//           <p>Loading chart...</p>
//         ) : error ? (
//           <p className="text-red-500">Error loading chart data</p>
//         ) : (
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="amount" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const DashboardPage = () => {
//   const [chartData, setChartData] = useState([]);

//   // Simulyatsiya qilingan API chaqiruvi
//   useEffect(() => {
//     const fakeData = [
//       { name: 'Yanvar', sales: 4000 },
//       { name: 'Fevral', sales: 3000 },
//       { name: 'Mart', sales: 5000 },
//       { name: 'Aprel', sales: 4500 },
//     ];
//     setChartData(fakeData);
//   }, []);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
      

//         {/* Main Content */}
//         <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
//           <h2 className="mt-4">Dashboard</h2>

//           {/* Cards */}
//           <div className="row mb-4">
//             <div className="col-md-4">
//               <div className="card text-white bg-primary mb-3">
//                 <div className="card-body">
//                   <h5 className="card-title">Foydalanuvchilar</h5>
//                   <p className="card-text">1500+</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card text-white bg-success mb-3">
//                 <div className="card-body">
//                   <h5 className="card-title">Savdo</h5>
//                   <p className="card-text">$25,000</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card text-white bg-warning mb-3">
//                 <div className="card-body">
//                   <h5 className="card-title">Yangi Buyurtmalar</h5>
//                   <p className="card-text">320 ta</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Bar Chart */}
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Oylik Savdo Tahlili</h5>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="sales" fill="#007bff" barSize={50} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './DashboardPage.css';
// import DashboardChart from './Charts';
// const DashboardPage = () => {
//   return (
//     <div className="container-fluid bg-light mt-3">
//       <main className="">
//         <header className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
//           <h1 className="h2 text-primary">Welcome Erkinjon, 👋</h1>
//           <button className="btn btn-outline-primary custom-btn">Filter by date</button>
//         </header>

//         <div className="row">
//           {['Total Sales', 'Net', 'Invoice Due', 'Total Sell Return'].map((item, index) => (
//             <div key={index} className="col-md-3 mb-4">
//               <div className="card text-center shadow-sm custom-card">
//                 <div className="card-body">
//                   <h5 className="card-title text-primary">{item}</h5>
//                   <p className="card-text fw-bold text-dark">$ 0.00</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <DashboardChart />
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DashboardPage.css';
import DashboardChart from './Charts';

const DashboardPage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // LocalStorage yoki Recoil dan foydalanuvchi ismini olish
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="container-fluid bg-light mt-3">
      <main className="">
        <header className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
          <h1 className="h2 text-primary">Xush kelibsiz: {username || 'Guest'}👋</h1>
          <button className="btn btn-outline-primary custom-btn">Filter by date</button>
        </header>

        <div className="row">
          {['Total Sales', 'Net', 'Invoice Due', 'Total Sell Return'].map((item, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card text-center shadow-sm custom-card">
                <div className="card-body">
                  <h5 className="card-title text-primary">{item}</h5>
                  <p className="card-text fw-bold text-dark">$ 0.00</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DashboardChart />
      </main>
    </div>
  );
};

export default DashboardPage;

