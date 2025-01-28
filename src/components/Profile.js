import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userPolls, setUserPolls] = useState([]);
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem("token");

                const userResponse = await fetch("http://localhost:3000/api/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = await userResponse.json();
                setUserInfo(userData);

                const pollsResponse = await fetch("http://localhost:3000/api/user-polls", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const pollsData = await pollsResponse.json();
                setUserPolls(pollsData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    return (
        <div className="profileBlock">
            <div className="profile-container">
                {userInfo && (
                    <div className="user-info">
                        <h2>Welcome, {userInfo.name}!</h2>
                        <p>Email: {userInfo.email}</p>
                    </div>
                )}

                <div className="user-polls">
                    <h3>Your Polls</h3>
                    {userPolls.length > 0 ? (
                        <ul>
                            {userPolls.map((poll) => (
                                <li key={poll.id} className="poll-item">
                                    <h4>{poll.title}</h4>
                                    <p>{poll.description}</p>
                                    <span>Created on: {poll.date}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You haven't created any polls yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
