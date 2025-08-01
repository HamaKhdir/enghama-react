import useApi from '../hooks/useApi';
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';

const PageContainer = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const PageTitle = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    color: ${props => props.theme.primary_color || '#333'};
`;

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    align-items: stretch;

`;

const LoadingMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
`;

const ErrorMessage = styled.p`
    text-align: center;
    font-size: 1.2rem;
    color: red;
`;

const ProjectsPage = () => {
    // 2. بە یەک دێڕی سادە، داتاکان وەردەگرین!
    const { data: projects, loading, error } = useApi('/projects/'); 

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects.</p>;

    return (
        <PageContainer>
            <PageTitle>My Projects</PageTitle>
            <ProjectsGrid>
                {projects && projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </ProjectsGrid>
        </PageContainer>
    );
};

export default ProjectsPage;