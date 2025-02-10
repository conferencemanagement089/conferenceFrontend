import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const ChairDashboard = () => {
    const { token, user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await axios.get('https://conferencebackend.onrender.com/api/sessions', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const filteredSessions = res.data
                .map(session => ({
                    ...session,
                    conferences: session.conferences.filter(conf => conf.chairId === user._id)
                }))
                .filter(session => session.conferences.length > 0);
            setSessions(filteredSessions);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleOrganize = (conferenceId) => {
        navigate(`/organize/${conferenceId}`);
    };

    return (
        <div className="dashboard-container">
            <h1>Chair Dashboard</h1>
            {sessions.map(session => (
                <div key={session._id} className="session-container">
                    <button className="session-button" onClick={() => setSessions(prev => prev.map(s => s._id === session._id ? { ...s, expanded: !s.expanded } : s))}>
                        {session.name} - {new Date(session.startDateTime).toLocaleString()} to {new Date(session.endDateTime).toLocaleString()} at {session.location}
                    </button>
                    {session.expanded && (
                        <div className="conferences-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Date</th>
                                        <th>Presenter Email</th>
                                        <th>Room Number</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {session.conferences.map((conference) => (
                                        <tr key={conference._id}>
                                            <td>{conference.title}</td>
                                            <td>{conference.description}</td>
                                            <td>{new Date(conference.date).toLocaleDateString()} {conference.time}</td>
                                            <td>{conference.presenterEmail}</td>
                                            <td>{conference.roomNumber}</td>
                                            <td>{conference.enabled ? 'Enabled' : 'Disabled'}</td>
                                            <td>
                                                <button onClick={() => handleOrganize(conference._id)}>Organize</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChairDashboard;
