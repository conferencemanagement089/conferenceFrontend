import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Add a CSS file for styling

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('Attendee');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://https://conferencebackend.onrender.com/api/auth/register', {
                username,
                email,
                password,
                age,
                department,
                phoneNo,
                address,
                role
            });
            navigate('/login');
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Attendee">Attendee</option>
                    <option value="Presenter">Presenter</option>
                    <option value="Chair">Chair</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <button onClick={goToLogin}>Back to Login</button>
        </div>
    );
};

export default RegisterPage;
