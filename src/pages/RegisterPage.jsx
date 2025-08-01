import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const AuthContainer = styled.div`
  max-width: 450px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: ${props => props.theme.primary_color};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline-color: ${props => props.theme.primary_color};
  }
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.primary_color};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.theme.secondary_color};
  }
`;

const ErrorMessage = styled.p`
    text-align: center;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    background-color: #e74c3c;
    margin-top: 1rem;
`;

const LoginPrompt = styled.p`
  margin-top: 1.5rem;
  color: #555;
  a {
    color: ${props => props.theme.primary_color};
    font-weight: bold;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '', password2: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError(''); // Clear previous errors
        if (formData.password !== formData.password2) {
            setError('Passwords do not match.');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/auth/register/', { // URLـەکە بگۆڕە
                email: formData.email,
                password: formData.password,
                password2: formData.password2,
            });
            navigate('/login');
        } catch (err) {
            const serverError = err.response?.data;
            if (serverError) {
                // Combine all error messages
                const messages = Object.values(serverError).flat().join(' ');
                setError(messages || 'Registration failed. Please try again.');
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    return (
        <AuthContainer>
            <FormTitle>Create an Account</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required autoComplete="new-password" />
                <Input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} required autoComplete="new-password" />
                <SubmitButton type="submit">Register</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <LoginPrompt>
                Already have an account? <Link to="/login">Log in</Link>
            </LoginPrompt>
        </AuthContainer>
    );
};

export default RegisterPage;