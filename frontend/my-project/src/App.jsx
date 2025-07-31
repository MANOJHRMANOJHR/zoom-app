import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import History from './history/history';
import Home from './Homepage/home';
import Landing from './Landingpage/Landing';
import AuthPage from './Loginorregisterauth/authy';
import Spinner from "./spinner/spinner";
//import { UserContext } from './USERCONTEXT/usercontext';
import Video from './video/video';

const AppRoutes = () => {
  //const { setUser } = useContext(UserContext);
  const [isok, setok] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post('http://localhost:3000/auth', { withCredentials: true });
        if (res.status === 200) {
          setok(true);
          const decodedToken = jwtDecode(res.data.token1);
         // setUser({ username: decodedToken.username, email: decodedToken.email });
        } else {
          setok(false);
        }
      } catch (err) {
        setok(false);
        console.error("Error fetching user data: ", err);
      }
      setLoading(false);
    };

    checkAuth();
  }, [location.pathname]); // ✅ recheck auth on route change

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={isok ? <Navigate to="/home" /> : <AuthPage />} />
      <Route path="/home" element={isok ? <Home /> : <Navigate to="/auth" />} />
      <Route path="/history" element={isok ? <History /> : <Navigate to="/auth" />} />
      <Route path="/:url" element={isok ? <Video /> : <Navigate to="/auth" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <AppRoutes /> {/* ✅ now Router is mounted before AppRoutes uses hooks */}
      </Router>
    </div>
  );
};

export default App;



