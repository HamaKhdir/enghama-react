import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
        transform: translateY(-5px);
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain; /* گۆڕانکارییەکە لێرەدایە */
    display: block;
    background-color: #f8f9fa; 
`;

const CardContent = styled.div`
    padding: 1rem;
    flex-grow: 1;
    flex-direction: column;
    flex-grow: 1;    
`;

const CardTitle = styled.h3`
    color: ${props => props.theme.primary_color || '#333'};
    margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
    font-size: 0.9rem;
    margin-bottom: 1rem;
`;

const TechList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const TechTag = styled.span`
    background-color: ${props => props.theme.secondary_color || '#eee'};
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
`;
const CardLink = styled(Link)` // ئەمە زیاد بکە
    text-decoration: none;
    color: inherit;
`;

const CardFooter = styled.div`
  margin-top: auto; // ئەمە پاڵی پێوەدەنێت بۆ خوارەوە
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ProjectCard = ({ project }) => {
    // baseURLی Django بۆ وێنەکان
    // const imageUrl = `http://127.0.0.1:8000${project.image}`;
    const imageUrl = project.image;
    return (
        <CardLink to={`/projects/${project.slug}`}>
        <Card>
            <CardImage src={imageUrl} alt={project.title} />
            
            <CardContent>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
                <TechList>
                    {project.technologies_used.map(tech => (
                        <TechTag key={tech.id}>{tech.name}</TechTag>
                    ))}
                </TechList>
            </CardContent>
        </Card>
        </CardLink>
    );
};

export default ProjectCard;