import { useParams, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import styled, { keyframes } from 'styled-components';
import { device } from '../styles/breakpoints';
// --- Styled Components (ستایلەکان) ---

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DetailContainer = styled.div`
  max-width: 960px;
  margin: 3rem auto;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ProjectHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProjectTitle = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.primary_color};
  margin-bottom: 0.5rem;
  @media ${device.tablet} {
    font-size: 2.2rem; // قەبارەی بچووکتر
  }
`;

const TechList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.secondary_color};
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  background-color: #f8f9fa;
`;

const ProjectContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
  
  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.primary_color};
    border-bottom: 2px solid ${props => props.theme.secondary_color};
    padding-bottom: 0.5rem;
    text-align: left;
  }
`;

const ProjectLinks = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const ActionButton = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.primary_color};
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.theme.secondary_color};
    transform: translateY(-3px);
  }
   
  font-size: 1rem; // 'rem' بەکاردەهێنێت, زۆر باشە
  // ...
`;

const BackLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 3rem;
  color: ${props => props.theme.primary_color};
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr; // یەک ستوون لەسەر مۆبایل
  gap: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr; // دوو ستوون لەسەر شاشەی گەورە
  }
`;

const ProjectInfo = styled.div`
  // بۆ وردەکارییەکان و لینکەکان
`;

// --- کۆمپۆنێنتی سەرەکی ---

const ProjectDetailPage = () => {
    const { slug } = useParams();
    const { data: project, loading, error } = useApi(`projects/${slug}/`);

    if (loading) return <p>Loading project details...</p>;
    if (error) return <p>Error loading project.</p>;
    if (!project) return <p>Project not found.</p>;

    return (
        <DetailContainer>
            <ProjectHeader>
                <ProjectTitle>{project.title}</ProjectTitle>
                <TechList>
                    {project.technologies_used.map(tech => (
                        <TechTag key={tech.id}>{tech.name}</TechTag>
                    ))}
                </TechList>
            </ProjectHeader>
           <DetailGrid>
            <div>
            <ProjectImage src={project.image} alt={project.title} />
            </div>
            <ProjectInfo>
            <ProjectContent dangerouslySetInnerHTML={{ __html: project.description }} />

            {(project.live_demo_url || project.source_code_url) && (
                <ProjectLinks>
                    {project.live_demo_url && (
                        <ActionButton href={project.live_demo_url} target="_blank" rel="noopener noreferrer">
                             Live Demo 
                        </ActionButton>
                    )}
                    {project.source_code_url && (
                        <ActionButton href={project.source_code_url} target="_blank" rel="noopener noreferrer">
                              Source Code
                        </ActionButton>
                    )}
                </ProjectLinks>
            )} 
            </ProjectInfo>
            </DetailGrid>
            <BackLink to="/projects">Back to All Projects</BackLink>
        </DetailContainer>
    );
};

export default ProjectDetailPage;