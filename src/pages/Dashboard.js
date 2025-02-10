import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { token, user } = useContext(AuthContext);
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        fetchConferences();
    }, []);

    const fetchConferences = async () => {
        try {
            const res = await axios.get('https://conferencebackend.onrender.com/api/conferences', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConferences(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>{user.role} Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Presenter Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {conferences.map((conference) => (
                        <tr key={conference._id}>
                            <td>{conference.title}</td>
                            <td>{conference.description}</td>
                            <td>{conference.date}</td>
                            <td>{conference.presenterEmail}</td>
                            <td>{conference.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
