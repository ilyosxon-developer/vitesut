import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Login from './pages/auth/Login';
import DashboardLayout from './components/layouts/DashboardLayout';


const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Asosiy sahifa sifatida Login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                
                  <DashboardLayout />
                
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { RecoilRoot } from "recoil";
// import Login from "./login2";
// import DashboardLayout from "./components/layouts/DashboardLayout";

// const queryClient = new QueryClient();

// function App() {
//   // Himoyalangan marshrut (Protected Route)
//   const token = localStorage.getItem("token");

//   return (
//     <RecoilRoot>
//       <QueryClientProvider client={queryClient}>
//         <Router>
//           <Routes>
//             <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
//             <Route path="/login" element={<Login />} />
//             {/* Agar foydalanuvchi login qilmagan bo‘lsa, dashboard sahifasiga kira olmaydi */}
//             {token ? (
//               <Route path="/*" element={<DashboardLayout />} />
//             ) : (
//               <Route path="/*" element={<Navigate to="/login" />} />
//             )}
//           </Routes>
//         </Router>
//       </QueryClientProvider>
//     </RecoilRoot>
//   );
// }

// export default App;
