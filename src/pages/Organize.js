import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Organize.css';

const Organize = () => {
    const { token } = useContext(AuthContext);
    const { id } = useParams();
    const [conference, setConference] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetchConference();
        fetchChats();
    }, []);

    const fetchConference = async () => {
        try {
            const res = await axios.get(`https://conferencebackend.onrender.com/api/conferences/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConference(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const fetchChats = async () => {
        try {
            const res = await axios.get(`https://conferencebackend.onrender.com/api/conferences/${id}/chats`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Fetched chat for Chair:', res.data);
            setChats(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const toggleChatRoom = async () => {
        try {
            const res = await axios.patch(`https://conferencebackend.onrender.com/api/conferences/${id}/chat`, { enabled: !conference.chatEnabled }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConference(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const handleRefreshChats = () => {
        fetchChats();
    };

    return (
        <div className="organize-container">
            {conference && (
                <>
                    <h1>Organize Sessions: {conference.title}</h1>
                    <button onClick={toggleChatRoom}>
                        {conference.chatEnabled ? 'Disable' : 'Enable'} Chat Room
                    </button>
                    <h2>Chats</h2>
                    <div className="chat-container">
                        {chats.map((chat, index) => (
                            <div key={index} className="chat-message">
                                <strong>{chat.username}:</strong> {chat.message}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleRefreshChats}>Refresh Chat</button>
                </>
            )}
        </div>
    );
};

export default Organize;
