import React, { useState, useEffect } from 'react';
import search from '/search.svg';

export default function Bounties() {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editBounty, setEditBounty] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/bounties");
      const result = await response.json();
      console.log("Fetched data:", result);
      setData(result);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bounties/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        setData(data.filter((bounty) => bounty.id !== id));
      } else {
        console.error("Error deleting data: Non-200 status code", response.status);
      }
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleUpdate = async (bounty) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bounties/${bounty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bounty),
      });
      const updatedBounty = await response.json();
      setData((prevData) => {
        const index = prevData.findIndex((b) => b.id === updatedBounty.id);
        const newData = [...prevData];
        newData[index] = updatedBounty;
        return newData;
      });
      setEditMode(false);
      setEditBounty(null);
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#000746] h-full">
        <div className='pt-[4vh] pb-[4vh]'>
          <div className='m-auto p-[0.2rem] bg-gradient-to-r from-[#d48ff9] via-[#b25ffb] to-[#6300ff] rounded-[0.9rem] w-[40vw]'>
            <div className='flex justify-between bg-[#000746] p-[0.2rem] pr-[1rem] pl-[1rem] rounded-xl'>
              <input placeholder="Search Modules here..." className='text-[#d48ff9] placeholder-[#d48ff9] bg-[#000746] text-[1vw] w-full  focus:outline-none focus:ring-0 font-semibold'></input> 
              <img src={search} alt="search" className='cursor-pointer w-[2vw]'></img> 
            </div>
          </div>
        </div>
        {data.map((bounty) => (
          <div key={bounty.id} className="h-full w-[20vw] bg-[#b25ffb] m-4 rounded">
            <div className="flex place-items-center justify-between place-h-[10vh] w-full shadow-2xl p-4 font-bold">
              <div className="flex place-items-center">
                <img src={bounty.imgURL} alt="" className="h-[6vh]"></img>
                <p className="ml-2">{bounty.company}</p>
              </div>
              <div>
                <p>{bounty.reward}</p>
              </div>
            </div>
            <div className="m-6">
              <p className="font-bold mb-2">Bug Bounty Program</p>
              <button className="h-[4vh] bg-green-200 p-[0.5vh] rounded text-green-700 font-bold mb-2">campaign</button>
              <p className="text-[0.8vw]">Triaged by HackerOne, Retesting, Collaboration</p>
              <button className="h-[4vh] bg-gray-200 p-[0.5vh] rounded text-gray-900 font-bold mt-2 mr-2">Other Asset</button>
              <button className="h-[4vh] bg-gray-200 p-[0.5vh] rounded text-gray-900 font-bold mt-2 mr-2">Executable</button>
              <br />
              <button className="h-[4vh] bg-gray-200 p-[0.5vh] rounded text-gray-900 font-bold mt-2 mr-2">Wildcard</button>
            </div>
            <div className="flex justify-center">
              <button className="h-[4vh] w-[90%] bg-purple-700 p-[0.5vh] rounded text-white font-bold mb-2">See Details</button>
            </div>
            <div className="flex justify-around mt-2">
              <button 
                className="h-[4vh] w-[40%] bg-yellow-500 p-[0.5vh] rounded text-white font-bold mb-2"
                onClick={() => {
                  setEditMode(true);
                  setEditBounty(bounty);
                }}
              >
                Edit
              </button>
              <button 
                className="h-[4vh] w-[40%] bg-red-500 p-[0.5vh] rounded text-white font-bold mb-2"
                onClick={() => handleDelete(bounty.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {editMode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
              <h2>Edit Bounty</h2>
              <input
                type="text"
                value={editBounty.company}
                onChange={(e) => setEditBounty({ ...editBounty, company: e.target.value })}
              />
              <input
                type="text"
                value={editBounty.reward}
                onChange={(e) => setEditBounty({ ...editBounty, reward: e.target.value })}
              />
              <div className="flex justify-around mt-2">
                <button
                  className="h-[4vh] w-[40%] bg-green-500 p-[0.5vh] rounded text-white font-bold mb-2"
                  onClick={() => handleUpdate(editBounty)}
                >
                  Save
                </button>
                <button
                  className="h-[4vh] w-[40%] bg-gray-500 p-[0.5vh] rounded text-white font-bold mb-2"
                  onClick={() => {
                    setEditMode(false);
                    setEditBounty(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
