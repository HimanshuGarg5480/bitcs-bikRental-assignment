import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/feature/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/user/logout', { method: 'POST' });
      if (response.ok) {
        dispatch(clearUser());
        localStorage.clear();
        navigate('/login')
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="h-screen mx-auto p-4 bg-gray-700 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
      <p>Name: {user.username}</p> 
      <p>Email: {user.email}</p>
      <button 
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
