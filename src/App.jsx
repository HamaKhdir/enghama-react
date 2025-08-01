import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// Import Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import PostDetailPage from './pages/PostDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';


// --- Styled Components for Sticky Footer ---

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
`;


// --- Main App Component ---

function App() {
  const [theme, setTheme] = useState({});

  useEffect(() => {
    // Fetch site settings from the Django API
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/site_settings/settings/');
        setTheme(response.data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
        // Fallback to a default theme in case of an error
        setTheme({
          primary_color: '#3498db',
          secondary_color: '#2ecc71',
          background_color: '#ecf0f1',
          text_color: '#2c3e50',
        });
      }
    };

    fetchSettings();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<PostDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;