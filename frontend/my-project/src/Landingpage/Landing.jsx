import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Landing = () => {
  /*
  axios.get('http://localhost:3000/').then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.log(err);
  }
  );
*/
  const navigate = useNavigate();
  return (
    <>
  <div className="h-screen w-screen overflow-hidden bg-cover bg-[url('/background.png')]">
        <Navbar />
        <div className="w-full h-[calc(100vh-64px)] flex flex-col-reverse lg:flex-row justify-between px-8 lg:px-16 items-center">
          {/* Left Section */}
          <div className="lg:w-1/2 text-center lg:text-left text-white space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">
              <span className="text-[#FFD700]">Connect</span> with Your Loved Ones
            </h1>
            <p className="text-lg lg:text-2xl text-gray-200">
              Close the distance with <span className="font-semibold">Zoom Call</span>.
            </p>
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-[#FF7F50] to-[#FF4500] px-6 py-3 rounded-full text-lg lg:text-xl font-medium shadow-lg transform transition hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Right Section    sm:max-h-[50vh]  */}
          <div className="lg:w-1/2 flex justify-center items-center">
          <img
              src="./mobile.png"
              alt="Mobile Preview"
              className="h-[50vh] lg:h-[70vh]  w-auto"
            /> //
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
