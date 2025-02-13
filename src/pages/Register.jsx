import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    user_type: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password2) {
      setError('Parollar mos emas!');
      return;
    }

    try {
      const response = await fetch('https://milkbackend.pythonanywhere.com/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Ro‘yxatdan o‘tish muvaffaqiyatli!');
        setTimeout(() => window.location.href = '/login', 2000);
      } else {
        setError(data.detail || 'Ro‘yxatdan o‘tishda xatolik yuz berdi!');
      }
    } catch (err) {
      setError('Serverga ulanishda xatolik yuz berdi.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm border-0" style={{ width: '26rem' }}>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control border-success" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control border-success" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control border-success" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control border-success" name="email" placeholder="E-Mail Address" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control border-success" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control border-success" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select className="form-select border-success" name="user_type" value={formData.user_type} onChange={handleChange} required>
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {error && <div className="text-danger mb-2">{error}</div>}
          {success && <div className="text-success mb-2">{success}</div>}

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        

<div className="text-center mt-3">
  <span>Already have an account? </span>
  <Link to="/login" className="text-success">Login</Link>
</div>

      </div>
    </div>
  );
};

export default Register;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: '',
//     first_name: '',
//     last_name: '',
//     user_type: '' // Masalan: 'client' yoki 'admin' bo'lishi mumkin
//   });
  
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.password2) {
//       setError("Parollar mos kelmadi!");
//       return;
//     }
//     try {
//       const response = await axios.post('https://milkbackend.pythonanywhere.com/api/auth/register/', formData);
//       setSuccess('Ro‘yxatdan o‘tish muvaffaqiyatli!');
//       setError('');

//       // Ro'yxatdan o'tganidan keyin login sahifasiga yo'naltirish
//       setTimeout(() => {
//         window.location.href = '/login';
//       }, 2000);
//     } catch (err) {
//       setError('Ro‘yxatdan o‘tishda xatolik yuz berdi!');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '400px' }}>
//       <h2 className="text-center mb-4">Register</h2>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Username</label>
//           <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>First Name</label>
//           <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Last Name</label>
//           <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>User Type</label>
//           <select className="form-control" name="user_type" value={formData.user_type} onChange={handleChange} required>
//             <option value="">Select Type</option>
//             <option value="client">Client</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Confirm Password</label>
//           <input type="password" className="form-control" name="password2" value={formData.password2} onChange={handleChange} required />
//         </div>

//         <button type="submit" className="btn btn-success w-100">Register</button>
//       </form>

//       <div className="text-center mt-3">
//         <span>Already have an account? </span>
//         <a href="/login" className="text-success">Login</a>
//       </div>
//     </div>
//   );
// };

// export default Register;
