import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const AttendeeDashboard = () => {
    const { token, user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
        fetchRegistrations();
    }, []);

    const fetchSessions = async () => {
        try {
            const res = await axios.get('http://https://conferencebackend.onrender.com/api/sessions', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSessions(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const fetchRegistrations = async () => {
        try {
            const res = await axios.get(`http://https://conferencebackend.onrender.com/api/registrations/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRegistrations(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const registerForConference = async (id) => {
        try {
            await axios.post(`http://https://conferencebackend.onrender.com/api/conferences/${id}/register`, { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchRegistrations();
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const attendConference = (id) => {
        navigate(`/enter-conference/${id}`);
    };

    const isRegistered = (conferenceId) => {
        return registrations.some(reg => reg.conferenceId === conferenceId);
    };

    const isAttended = (conferenceId) => {
        return registrations.some(reg => reg.conferenceId === conferenceId && reg.attended);
    };

    return (
        <div className="dashboard-container">
            <h1>Attendee Dashboard</h1>
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
                                                {conference.enabled && !isRegistered(conference._id) && (
                                                    <button onClick={() => registerForConference(conference._id)}>Register</button>
                                                )}
                                                {conference.enabled && isRegistered(conference._id) && !isAttended(conference._id) && (
                                                    <button onClick={() => attendConference(conference._id)}>Attend</button>
                                                )}
                                                {isAttended(conference._id) && (
                                                    <button onClick={() => attendConference(conference._id)}>Enter Conference</button>
                                                )}
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

export default AttendeeDashboard;
