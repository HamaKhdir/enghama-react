import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';
import { useAuth } from '../context/AuthContext';

// --- Styled Components ---

const NavContainer = styled.nav`
  background-color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavLogo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.primary_color};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center; // بۆ ڕێکخستنی ستوونی
  gap: 2rem;

  @media ${device.tablet} {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${props => props.theme.text_color};
  font-weight: 500;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.primary_color};
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  &.active {
    color: ${props => props.theme.primary_color};
  }
`;

const AuthActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WelcomeMessage = styled.span`
  font-weight: 500;
  color: #555;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme.primary_color};
  color: ${props => props.theme.primary_color};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.primary_color};
    color: white;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  @media ${device.tablet} {
    display: block;
  }
  div {
    width: 25px;
    height: 3px;
    background-color: ${props => props.theme.text_color};
    margin: 5px;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // بۆ جوانتر دەرکەوتن
  gap: 1.5rem;
  background-color: white;
  position: absolute;
  top: 70px;
  right: 0;
  width: 100%;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transform: ${props => props.open ? 'translateY(0)' : 'translateY(-120%)'};
  transition: transform 0.3s ease-in-out;
`;

// --- Main Component ---

const Navbar = () => {
    
    const { user, logoutUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    
    const closeMenu = () => setIsOpen(false);
    
    // پارچەی JSXی دووبارەبوو بۆ لینکەکان
    const navLinksContent = (
      <>
        <StyledNavLink to="/" onClick={closeMenu}>Home</StyledNavLink>
        <StyledNavLink to="/projects" onClick={closeMenu}>Projects</StyledNavLink>
        <StyledNavLink to="/blog" onClick={closeMenu}>Blog</StyledNavLink>
        <StyledNavLink to="/about" onClick={closeMenu}>About</StyledNavLink>
        <StyledNavLink to="/contact" onClick={closeMenu}>Contact</StyledNavLink>
      </>
    );

    const authLinksContent = user ? (
      <AuthActions>
        {/* ئێستا دڵنیاین کە user.email بوونی هەیە */}
        <WelcomeMessage>Welcome, {user.first_name || user.email.split('@')[0]}</WelcomeMessage>
        {user.profile_picture && <ProfileImage src={user.profile_picture} alt="Profile" />}
        <LogoutButton onClick={() => { logoutUser(); closeMenu(); }}>Logout</LogoutButton>
      </AuthActions>
    
    ) : (
      <>
        <StyledNavLink to="/login" onClick={closeMenu}>Login</StyledNavLink>
        <StyledNavLink to="/register" onClick={closeMenu}>Register</StyledNavLink>
      </>
    );

    return (
        <NavContainer>
            <NavLogo to="/" onClick={closeMenu}>MyPortfolio</NavLogo>
            
            <NavLinks> {/* Desktop Menu */}
                {navLinksContent}
                {authLinksContent}
            </NavLinks>
            
            <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </HamburgerIcon>

            {isOpen && (
                <MobileMenu open={isOpen}> {/* Mobile Menu */}
                    {navLinksContent}
                    {authLinksContent}
                </MobileMenu>
            )}
        </NavContainer>
    );
};

export default Navbar;