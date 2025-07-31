import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
 // const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
   // await addToUserHistory(meetingCode);
   // navigate(`/${meetingCode}`);
try{
   let res = await axios.post("http://localhost:3000/add_to_activity", {
                meeting_code: meetingCode
            });
  // navigate(`/${meetingCode}`);


if(res.status===200){
navigate(`/${meetingCode}`);
}
else{
alert("Cannot join the meeting, server error");
}

          }
          catch(err){
            console.log(err);
          }



  };

  function handleLogout() {
    axios.post('http://localhost:3000/logout')
      .then(response => {
        console.log('Logged out successfully');
        navigate('/');
      
        
      })
      .catch(error => {
        console.error('There was an error logging out!', error);
      });
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-indigo-700 to-yellow-400 text-white">
    <nav className="flex justify-between items-center px-6 md:px-8 py-4 shadow-lg bg-blue-900">
      <h2 className="text-xl md:text-2xl font-bold">Zoom</h2>
      <div className="flex items-center space-x-4 md:space-x-6">
        <button

            onClick={() => navigate('/history')}
           className="text-sm md:text-base text-white hover:text-yellow-400"
          >
                      History
          </button>
          <button
            onClick={handleLogout}
            className="text-sm md:text-base bg-red-600 px-3 md:px-4 py-2 rounded-full hover:bg-red-800"
          >
            Logout
          </button>
        </div>
      </nav>



      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-10 py-10 md:py-20 space-y-8 md:space-y-0">
        <div className="flex flex-col space-y-6 max-w-md md:max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug md:leading-tight">
            Providing Quality Video Call Just Like Quality Education
          </h1>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="Enter Meeting Code"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black w-full md:w-auto"
            />
            <button
              onClick={handleJoinVideoCall}
              className="bg-yellow-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-yellow-600 w-full md:w-auto"
            >
              Join
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/logo3.png"
            alt="Cyber Call Logo"
            className="rounded-lg shadow-lg max-w-xs md:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;


