import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// --- Styled Components ---

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

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  margin: 2rem 0;
  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }
  &::before { margin-right: .5em; }
  &::after { margin-left: .5em; }
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButton = styled.button`
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    border-color: #bbb;
  }
`;

const RegisterPrompt = styled.p`
  margin-top: 2rem;
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


// --- Main Component ---

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loginUser } = useAuth(); // Use the loginUser function from context

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        const result = await loginUser(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };
    
    const handleSocialLogin = (provider) => {
        window.location.href = `http://127.0.0.1:8000/accounts/${provider}/login/?process=login`;
    };

    return (
        <AuthContainer>
            <FormTitle>Log In</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required autoComplete="email" />
                <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required autoComplete="current-password" />
                <SubmitButton type="submit">Log In</SubmitButton>
            </Form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Divider>or continue with</Divider>

            <SocialLoginContainer>
                <SocialButton onClick={() => handleSocialLogin('google')}><FaGoogle /> Sign in with Google</SocialButton>
                <SocialButton onClick={() => handleSocialLogin('github')}><FaGithub /> Sign in with GitHub</SocialButton>
                {/* <SocialButton onClick={() => handleSocialLogin('apple')}><FaApple /> Sign in with Apple</SocialButton> */}
                <SocialButton onClick={() => handleSocialLogin('twitter')}><FaTwitter /> Sign in with Twitter</SocialButton>
                <SocialButton onClick={() => handleSocialLogin('facebook')}><FaFacebook /> Sign in with Facebook</SocialButton>
            </SocialLoginContainer>
            
            <RegisterPrompt>
                Don't have an account? <Link to="/register">Sign up</Link>
            </RegisterPrompt>
        </AuthContainer>
    );
};

export default LoginPage;