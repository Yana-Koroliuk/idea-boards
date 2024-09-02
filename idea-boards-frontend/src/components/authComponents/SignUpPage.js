import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            if (!email || !password || !fullName) {
                setError('Please fill in all fields.');
                return;
            }

            await axios.post('http://localhost:8080/auth/signup', { email, password, fullName });
            setSuccess('Signup successful. Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            setError('Signup failed. ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border rounded-lg p-4" style={{ width: '600px', height: 'auto' }}>
                <MDBContainer className="p-3">
                    <h2 className="mb-4 text-center">Sign Up Page</h2>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                    <MDBInput wrapperClass="mb-3" id="fullName" placeholder="Full Name" value={fullName} type="text" onChange={(e) => setFullName(e.target.value)} />
                    <MDBInput wrapperClass="mb-3" placeholder="Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass="mb-3" placeholder="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="mb-4 d-block mx-auto fixed-action-btn btn-primary" style={{ height: '40px', width: '100%' }} onClick={handleSignup}>
                        Sign Up
                    </button>
                    <div className="text-center">
                        <p>Already Registered? <a href="/login">Login</a></p>
                    </div>
                </MDBContainer>
            </div>
        </div>
    );
}

export default SignupPage;
