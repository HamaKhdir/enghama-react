import styled from 'styled-components';
import useApi from '../hooks/useApi';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { device } from '../styles/breakpoints';

const HeroSection = styled.section`
  background-color: ${props => props.theme.primary_color};
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  @media ${device.tablet} {
    font-size: 2.5rem; // قەبارەی بچووکتر بۆ تابلێت و مۆبایل
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.primary_color};
  @media ${device.tablet} {
    font-size: 2rem; // قەبارەی بچووکتر
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: stretch;
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${props => props.theme.primary_color};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const HomePage = () => {
    // تەنها پڕۆژە featuredـەکان وەردەگرین
    const { data: projects, loading, error } = useApi('projects/?is_featured=true');

    return (
        <>
            <SEO 
                title="Home | Eng. Hama - Full-Stack Developer"
                description="Welcome to the professional portfolio of Eng. Hama, a skilled Full-Stack Developer specializing in React and Django."
            />
            <HeroSection>
                <HeroTitle>Welcome to My Portfolio</HeroTitle>
                <HeroSubtitle>I build modern and efficient web applications.</HeroSubtitle>
            </HeroSection>

            <Section>
                <SectionTitle>Featured Projects</SectionTitle>
                {loading && <p>Loading projects...</p>}
                {error && <p>Could not load projects.</p>}
                {projects && (
                    <>
                        <ProjectsGrid>
                            {projects.slice(0, 3).map(project => ( // تەنها ٣ دانە پیشان دەدەین
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </ProjectsGrid>
                        <ViewAllLink to="/projects">View All Projects</ViewAllLink>
                    </>
                )}
            </Section>
        </>
    );
};

export default HomePage;