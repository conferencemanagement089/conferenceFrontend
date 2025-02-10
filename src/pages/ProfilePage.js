import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './ProfilePage.css'; // Add a CSS file for styling

const ProfilePage = () => {
    const { token } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('http://https://conferencebackend.onrender.com/api/auth/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };

        fetchProfile();
    }, [token]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <p><strong>Name:</strong> {profile.username}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Department:</strong> {profile.department}</p>
            <p><strong>Phone Number:</strong> {profile.phoneNo}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Role:</strong> {profile.role}</p>
        </div>
    );
};

export default ProfilePage;
