import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.text_color};
  color: #fff;
  padding: 2rem 1rem;
  margin-top: 4rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

const SocialLinks = styled.div`
  margin-bottom: 1.5rem;
  
  a {
    color: white;
    margin: 0 1rem;
    font-size: 2rem; /* قەبارەی ئایکۆنەکان گەورەتر دەکەین */
    transition: color 0.3s, transform 0.3s;
    display: inline-block;

    &:hover {
      color: ${props => props.theme.primary_color};
      transform: scale(1.1);
    }
  }
`;


const CopyrightText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;


const Footer = () => {
    // بەکارهێنانی ThemeContext بۆ وەرگرتنی ڕێکخستنەکان
    const theme = useContext(ThemeContext);

    return (
        <FooterContainer>
            <FooterContent>
                <SocialLinks>
                    {/* بە شێوەی مەرجدار ئایکۆنەکان پیشان دەدەین */}
                    {theme.github_url && (
                        <a href={theme.github_url} target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                    )}
                    {theme.linkedin_url && (
                        <a href={theme.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    )}
                    {theme.twitter_url && (
                        <a href={theme.twitter_url} target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                    )}
                </SocialLinks>
                <CopyrightText>
                    © {new Date().getFullYear()} {theme.site_name || 'My Portfolio'}. All rights reserved.
                </CopyrightText>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;