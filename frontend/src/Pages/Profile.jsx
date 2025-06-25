import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";


const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [userIssues, setUserIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Function to fetch user profile data
  useEffect(() => {
    const fetchProfileAndIssues = async () => {
      try {
        const userResponse = await axios.get("users/profile");
        setUserProfile(userResponse.data);

        const issuesResponse = await axios.get("users/my-issues");
        setUserIssues(issuesResponse.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndIssues();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleBack = ()=>{
    navigate(-1); // Navigate back to the previous page
  }

  if(loading) return <div className=" h-screen bg-green-100 flex justify-center" ><h1 className="text-4xl">Loading..</h1></div>
  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>;

  return (
  <div className="container w-[100%] bg-green-100 min-h-screen flex flex-col mx-auto justify-around py-10">
    
    {/* <button 
    className="back-btn rounded-md font-bold absolute top-5 left-5 text-lg text-gray-700 py-1 px-2 border border-gray-800 hover:bg-gray-700 hover:text-white cursor-pointer"
    onClick={handleBack}
    >Back</button> */}
    
   <div className="profile-card bg-white w-[90%] mx-auto rounded-md shadow-lg shadow-gray-500 py-5 px-7 flex justify-between">

    <button className="cursor-pointer" onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
</svg>

    </button>


    <div className="profile-data text-right">
    <h1 className="text-3xl font-bold mb-4 text-sky-900 ">User Profile </h1>
    <div className="profile-details">
      <p className="text-sky-900"><strong>Name:</strong> {userProfile.name}</p>
      <p className="text-sky-900"><strong>Email:</strong> {userProfile.email}</p>
      </div>
    </div>
    
   </div>
   <div className="issue-container flex flex-col gap-1 justify-center ">
    <h2 className="text-2xl font-bold text-sky-900  w-[90%] mx-auto mt-5">Your Issues</h2>
    {userIssues.length === 0 ? (
      <p className="text-gray-500 p-2">No issues reported yet.</p>
    ) : (
        <div className="issue-list flex flex-col ">
            {userIssues.map((issue) => (
            <div key={issue._id} className="issues-card bg-white w-[90%] mx-auto rounded-md shadow-lg shadow-gray-500 py-5 px-7 text-left mt-5">
                <h3 className="text-lg font-semibold text-sky-900">{issue.title}</h3>
                <p className="text-gray-700">{issue.description}</p>
                <p className="text-gray-500">Location: {issue.location}</p>
                {issue.image && (
                <img src={issue.image} alt="Issue" className="mt-2 w-full h-auto rounded-md" />
                )}
            </div>
            ))}
        </div>
      
    )}

    
   
   </div>

  </div>
);
};

export default Profile;
