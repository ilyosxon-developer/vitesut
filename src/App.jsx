  import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { RecoilRoot } from 'recoil';
  import Login from '@pages/auth/Login';
  import DashboardLayout from '@components/layouts/DashboardLayout';


  const queryClient = new QueryClient();

  function App() {
    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={<DashboardLayout />}
              />
            </Routes>
          </Router>
        </QueryClientProvider>
      </RecoilRoot>
    );
  }

  export default App;
  // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  // import { RecoilRoot } from 'recoil';
  // import { useAxiosInterceptors } from '@services/axios.service';
  // import Login from '@pages/auth/Login';
  // import DashboardLayout from './components/layouts/DashboardLayout';
  // import ProtectedRoute from './components/ProtectedRoute';
  // import GlobalLoader from './components/GlobalLoader';
  
  // const queryClient = new QueryClient();
  
  // function AppContent() {
  //   useAxiosInterceptors(); // Interceptorlarni ishga tushirish
  //   return (
  //     <>
  //       <GlobalLoader />
  //       <Router>
  //         <Routes>
  //           <Route path="/" element={<Navigate to="/login" />} />
  //           <Route path="/login" element={<Login />} />
  //           <Route
  //             path="/*"
  //             element={
  //               <ProtectedRoute>
  //                 <DashboardLayout />
  //               </ProtectedRoute>
  //             }
  //           />
  //         </Routes>
  //       </Router>
  //     </>
  //   );
  // }
  
  // function App() {
  //   return (
  //     <RecoilRoot>
  //       <QueryClientProvider client={queryClient}>
  //         <AppContent />
  //       </QueryClientProvider>
  //     </RecoilRoot>
  //   );
  // }
  
  // export default App;
  
