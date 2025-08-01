import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { device } from '../styles/breakpoints';
import SEO from '../components/SEO';
import useApi from '../hooks/useApi';

// --- Styled Components ---

const AboutContainer = styled.div`
  max-width: 960px;
  margin: 3rem auto;
  padding: 2rem;

  @media ${device.tablet} {
    padding: 1rem;
    margin: 2rem auto;
  }
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;

  @media ${device.tablet} {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border: 5px solid ${props => props.theme.primary_color || '#ccc'};
  flex-shrink: 0;

  @media ${device.mobile} {
    width: 200px;
    height: 200px;
  }
`;

const BioContainer = styled.div`
  flex-grow: 1;
`;

const BioTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.primary_color};
  margin-bottom: 1.5rem;
  
  @media ${device.tablet} {
    font-size: 2rem;
  }
`;

const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: justify;
`;

// --- چارەسەری هەڵەکە لێرەدایە: پێناسەکردنی SectionWrapper ---
const SectionWrapper = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.primary_color};
  border-bottom: 2px solid ${props => props.theme.secondary_color};
  display: inline-block;
  padding-bottom: 0.5rem;
  
  @media ${device.tablet} {
    font-size: 2rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  text-align: center;
`;

const SkillCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  font-weight: 500;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 2rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: #ddd;
    
    @media ${device.tablet} {
      left: 20px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 10px 40px;
  position: relative;
  width: 50%;
  
  &:nth-child(odd) {
    left: 0;
  }
  
  &:nth-child(even) {
    left: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    background-color: white;
    border: 4px solid ${props => props.theme.primary_color};
    top: 25px;
    border-radius: 50%;
    z-index: 1;
  }

  &:nth-child(even)::after {
    left: -10px;
  }

  @media ${device.tablet} {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
    left: 0 !important;

    &::after {
      left: 10px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  text-align: left;
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const TimelineSubtitle = styled.h4`
  font-size: 1rem;
  color: #777;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const TimelineDate = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.primary_color};
  font-weight: bold;
`;

// --- Main Component ---

const AboutPage = () => {
    const theme = useContext(ThemeContext) || {};
    
    const { data: skills, loading: skillsLoading } = useApi('/cv/skills/');
    const { data: experiences, loading: expLoading } = useApi('/cv/experience/');
    const { data: educations, loading: eduLoading } = useApi('/cv/education/');

    const profilePictureUrl = theme.profile_picture 
        ? `http://127.0.0.1:8000${theme.profile_picture}` 
        : "https://picsum.photos/250";

    const formatDate = (dateStr) => dateStr ? new Date(dateStr).getFullYear() : 'Present';

    return (
        <AboutContainer>
            <SEO 
                title="About Me | Your Name"
                description="Learn more about my skills, experience, and passion for web development."
            />
            
            <ProfileSection>
                <ProfileImage 
                    src={profilePictureUrl} 
                    alt="Your Name" 
                />
                <BioContainer>
                    <BioTitle>About Me</BioTitle>
                    <Bio>
                        Welcome to my portfolio! I am a passionate Full-Stack Developer specializing in creating modern, 
                        efficient, and scalable web applications. My expertise lies in building robust backends with Django 
                        and dynamic, responsive frontends with React. I am always eager to learn new technologies and solve complex problems.
                    </Bio>
                </BioContainer>
            </ProfileSection>

            <SectionWrapper>
              <SectionTitle>My Skills</SectionTitle>
            </SectionWrapper>
            {skillsLoading ? <p>Loading skills...</p> : (
                <SkillsGrid>
                    {skills && skills.map(skill => (
                        <SkillCard key={skill.id}>{skill.name}</SkillCard>
                    ))}
                </SkillsGrid>
            )}

            <SectionWrapper>
                <SectionTitle>Work Experience</SectionTitle>
            </SectionWrapper>
            {expLoading ? <p>Loading experience...</p> : (
                <TimelineContainer>
                    {experiences && experiences.map((exp) => (
                        <TimelineItem key={exp.id}>
                            <TimelineContent>
                                <TimelineTitle>{exp.job_title}</TimelineTitle>
                                <TimelineSubtitle>{exp.company_name}</TimelineSubtitle>
                                <TimelineDate>{formatDate(exp.start_date)} - {formatDate(exp.end_date)}</TimelineDate>
                                <p style={{marginTop: '1rem', textAlign: 'justify'}}>{exp.description}</p>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </TimelineContainer>
            )}

            <SectionWrapper>
                <SectionTitle>Education</SectionTitle>
            </SectionWrapper>
            {eduLoading ? <p>Loading education...</p> : (
                 <TimelineContainer>
                    {educations && educations.map((edu) => (
                        <TimelineItem key={edu.id}>
                            <TimelineContent>
                                <TimelineTitle>{edu.degree}</TimelineTitle>
                                <TimelineSubtitle>{edu.institution}</TimelineSubtitle>
                                <TimelineDate>{formatDate(edu.start_date)} - {formatDate(edu.end_date)}</TimelineDate>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </TimelineContainer>
            )}
        </AboutContainer>
    );
};

export default AboutPage;