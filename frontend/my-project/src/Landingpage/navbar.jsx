import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 lg:px-12 bg-[#4B0082] text-white shadow-lg">
      {/* Left Side - Logo */}
      <div className="text-3xl font-extrabold tracking-wide text-[#FFD700]">Zoom</div>

      {/* Right Side - Links */}
      <div className="flex space-x-4 lg:space-x-8 text-sm lg:text-lg">
        <button
          onClick={() => navigate('/auth')}
          className="hover:text-[#FFD700] transition-colors font-medium"
        >
          Register
        </button>
        <button
          onClick={() => navigate('/auth')}
          className="hover:text-[#FFD700] transition-colors font-medium"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


