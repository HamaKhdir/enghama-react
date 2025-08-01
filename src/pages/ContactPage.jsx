import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { device } from '../styles/breakpoints';

const ContactContainer = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: ${props => props.theme.primary_color};
  margin-bottom: 2rem;
  @media ${device.tablet} {
    font-size: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline-color: ${props => props.theme.primary_color};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
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

const FormMessage = styled.p`
    text-align: center;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    background-color: ${props => (props.type === 'success' ? props.theme.secondary_color : '#e74c3c')};
    margin-top: 1rem;
`;


const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ message: '', type: '' }); // 'success' or 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus({ message: '', type: '' }); // Clear previous status

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/core/contact/', formData);
            setFormStatus({ message: 'Message sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred. Please try again.";
            setFormStatus({ message: errorMessage, type: 'error' });
        }
    };

    return (
        <ContactContainer>
            <FormTitle>Get In Touch</FormTitle>
            <Form onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                <Input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <TextArea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
                <SubmitButton type="submit">Send Message</SubmitButton>
            </Form>
            {formStatus.message && (
                <FormMessage type={formStatus.type}>
                    {formStatus.message}
                </FormMessage>
            )}
        </ContactContainer>
    );
};

export default ContactPage;