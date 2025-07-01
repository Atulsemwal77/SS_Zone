import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogout = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
  localStorage.removeItem("token"); 
  navigate("/admin/login"); 
  alert("logout successful")
  toast.success("Logged out successfully");
};

  return (
    <div onClick={handleLogout} className='cursor-pointer bg-amber-400 p-3 w-fit'>Logout</div>
  )
}

export default AdminLogout