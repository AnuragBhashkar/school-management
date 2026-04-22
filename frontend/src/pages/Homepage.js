import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/userRelated/userSlice';
import { Container, Grid, Box, Button, IconButton, Tooltip } from '@mui/material';
import {
    School,
    Groups,
    Assignment,
    TrendingUp,
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import styled, { keyframes, css } from 'styled-components';
import Students from "../assets/students.svg";

const Homepage = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.user);

    return (
        <PageWrapper $dark={darkMode}>
            {/* Floating Navbar */}
            <Navbar $dark={darkMode}>
                <NavBrand $dark={darkMode}>
                    <School sx={{ fontSize: 28 }} />
                    <span>SchoolSync</span>
                </NavBrand>
                <NavActions>
                    <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                        <ToggleButton onClick={() => dispatch(toggleDarkMode())} $dark={darkMode}>
                            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                        </ToggleButton>
                    </Tooltip>
                    <NavLink to="/choose" $dark={darkMode}>Login</NavLink>
                    <NavSignUp to="/Adminregister" $dark={darkMode}>Sign Up</NavSignUp>
                </NavActions>
            </Navbar>

            {/* Animated background blobs */}
            <BlobOne $dark={darkMode} />
            <BlobTwo $dark={darkMode} />
            <BlobThree $dark={darkMode} />

            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <HeroContent>
                                <Badge $dark={darkMode}>🎓 #1 School Management Platform</Badge>
                                <HeroTitle $dark={darkMode}>
                                    Empower Your
                                    <GradientText> School </GradientText>
                                    With Smart Management
                                </HeroTitle>
                                <HeroSubtitle $dark={darkMode}>
                                    Streamline administration, track attendance, manage classes, assess
                                    performance, and communicate effortlessly — all from one beautiful platform.
                                </HeroSubtitle>
                                <HeroButtons>
                                    <PrimaryButton to="/choose">
                                        Get Started
                                        <span style={{ marginLeft: 8 }}>→</span>
                                    </PrimaryButton>
                                    <SecondaryButton to="/chooseasguest" $dark={darkMode}>
                                        Explore as Guest
                                    </SecondaryButton>
                                </HeroButtons>
                                <TrustBar $dark={darkMode}>
                                    <TrustAvatars>
                                        {['A', 'B', 'C', 'D'].map((letter, i) => (
                                            <TrustAvatar key={i} $index={i}>{letter}</TrustAvatar>
                                        ))}
                                    </TrustAvatars>
                                    <TrustText $dark={darkMode}>
                                        <strong>500+</strong> schools already onboarded
                                    </TrustText>
                                </TrustBar>
                            </HeroContent>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroImageWrapper>
                                <HeroImage src={Students} alt="Students collaborating" />
                                <FloatingCard $dark={darkMode} style={{ top: '10%', right: '-5%' }}>
                                    <CardIcon $color="#6C63FF">
                                        <Groups sx={{ fontSize: 20 }} />
                                    </CardIcon>
                                    <div>
                                        <CardNumber $dark={darkMode}>2,500+</CardNumber>
                                        <CardLabel $dark={darkMode}>Active Students</CardLabel>
                                    </div>
                                </FloatingCard>
                                <FloatingCard $dark={darkMode} style={{ bottom: '15%', left: '-8%' }}>
                                    <CardIcon $color="#FF6B6B">
                                        <TrendingUp sx={{ fontSize: 20 }} />
                                    </CardIcon>
                                    <div>
                                        <CardNumber $dark={darkMode}>98%</CardNumber>
                                        <CardLabel $dark={darkMode}>Satisfaction Rate</CardLabel>
                                    </div>
                                </FloatingCard>
                            </HeroImageWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <FeaturesSection>
                <Container maxWidth="lg">
                    <SectionLabel $dark={darkMode}>Features</SectionLabel>
                    <SectionTitle $dark={darkMode}>Everything You Need</SectionTitle>
                    <FeaturesGrid>
                        {features.map((feat, i) => (
                            <FeatureCard key={i} $dark={darkMode} $delay={i * 0.1}>
                                <FeatureIcon $color={feat.color}>{feat.icon}</FeatureIcon>
                                <FeatureTitle $dark={darkMode}>{feat.title}</FeatureTitle>
                                <FeatureDesc $dark={darkMode}>{feat.desc}</FeatureDesc>
                            </FeatureCard>
                        ))}
                    </FeaturesGrid>
                </Container>
            </FeaturesSection>

            {/* CTA Section */}
            <CTASection>
                <CTACard>
                    <CTATitle>Ready to Transform Your School?</CTATitle>
                    <CTASubtitle>Join hundreds of schools already using SchoolSync to streamline operations.</CTASubtitle>
                    <CTAButtons>
                        <CTAButton to="/Adminregister">Create Free Account</CTAButton>
                        <CTAButtonAlt to="/chooseasguest">Try Demo</CTAButtonAlt>
                    </CTAButtons>
                </CTACard>
            </CTASection>

            {/* Footer */}
            <Footer $dark={darkMode}>
                <FooterText $dark={darkMode}>
                    © 2026 SchoolSync. Built with ❤️ for educators everywhere.
                </FooterText>
            </Footer>
        </PageWrapper>
    );
};

export default Homepage;

// ── Data ──
const features = [
    {
        icon: <School sx={{ fontSize: 28 }} />,
        title: 'Class Management',
        desc: 'Organize classes, sections, and curriculum with an intuitive drag-and-drop interface.',
        color: '#6C63FF',
    },
    {
        icon: <Groups sx={{ fontSize: 28 }} />,
        title: 'Student & Staff',
        desc: 'Manage student enrollment, teacher assignments, and role-based access in one place.',
        color: '#FF6B6B',
    },
    {
        icon: <Assignment sx={{ fontSize: 28 }} />,
        title: 'Attendance & Exams',
        desc: 'Track daily attendance with smart reports and manage exam results effortlessly.',
        color: '#4ECDC4',
    },
    {
        icon: <TrendingUp sx={{ fontSize: 28 }} />,
        title: 'Performance Analytics',
        desc: 'Visualize trends with interactive charts and make data-driven decisions.',
        color: '#FFD93D',
    },
];

// ── Animations ──
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(5deg); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blobMove1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
`;

const blobMove2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-40px, 30px) scale(1.05); }
  66% { transform: translate(20px, -40px) scale(0.95); }
`;

// ── Styled Components ──
const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${p => p.$dark
        ? 'linear-gradient(135deg, #0f0c29 0%, #1a1a3e 50%, #24243e 100%)'
        : 'linear-gradient(135deg, #fafafe 0%, #f0eef6 50%, #e8e4f0 100%)'};
  overflow-x: hidden;
  position: relative;
  transition: background 0.5s ease;
`;

const BlobOne = styled.div`
  position: fixed;
  top: -150px;
  right: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: ${p => p.$dark
        ? 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)'};
  animation: ${blobMove1} 20s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const BlobTwo = styled.div`
  position: fixed;
  bottom: -200px;
  left: -150px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: ${p => p.$dark
        ? 'radial-gradient(circle, rgba(255,107,107,0.1) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)'};
  animation: ${blobMove2} 25s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
`;

const BlobThree = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${p => p.$dark
        ? 'radial-gradient(circle, rgba(78,205,196,0.08) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(78,205,196,0.06) 0%, transparent 70%)'};
  animation: ${blobMove1} 30s ease-in-out infinite reverse;
  pointer-events: none;
  z-index: 0;
`;

// ── Navbar ──
const Navbar = styled.nav`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-radius: 16px;
  background: ${p => p.$dark
        ? 'rgba(30, 30, 60, 0.75)'
        : 'rgba(255, 255, 255, 0.75)'};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  box-shadow: 0 8px 32px ${p => p.$dark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)'};
  z-index: 1000;
  transition: all 0.4s ease;
`;

const NavBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${p => p.$dark ? '#fff' : '#1a1a2e'};
  span { letter-spacing: -0.5px; }
  svg { color: #6C63FF; }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleButton = styled(IconButton)`
  && {
    color: ${p => p.$dark ? '#ffd93d' : '#6C63FF'};
    background: ${p => p.$dark ? 'rgba(255,217,61,0.1)' : 'rgba(108,99,255,0.1)'};
    border-radius: 12px;
    width: 42px;
    height: 42px;
    transition: all 0.3s ease;
    &:hover {
      background: ${p => p.$dark ? 'rgba(255,217,61,0.2)' : 'rgba(108,99,255,0.2)'};
      transform: rotate(30deg);
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.8)' : '#555'};
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  &:hover {
    color: #6C63FF;
    background: ${p => p.$dark ? 'rgba(108,99,255,0.1)' : 'rgba(108,99,255,0.08)'};
  }
`;

const NavSignUp = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 0.95rem;
  background: linear-gradient(135deg, #6C63FF 0%, #5a52e0 100%);
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.35);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(108, 99, 255, 0.45);
  }
`;

// ── Hero ──
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 140px 0 80px;
  position: relative;
  z-index: 1;
`;

const HeroContent = styled.div`
  animation: ${slideUp} 0.8s ease-out;
`;

const Badge = styled.div`
  display: inline-block;
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 24px;
  background: ${p => p.$dark ? 'rgba(108,99,255,0.15)' : 'rgba(108,99,255,0.1)'};
  color: ${p => p.$dark ? '#a5a0ff' : '#6C63FF'};
  border: 1px solid ${p => p.$dark ? 'rgba(108,99,255,0.2)' : 'rgba(108,99,255,0.15)'};
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 24px;
  color: ${p => p.$dark ? '#ffffff' : '#1a1a2e'};
  letter-spacing: -1px;
  transition: color 0.4s ease;
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #6C63FF 0%, #FF6B6B 50%, #4ECDC4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.15rem;
  line-height: 1.7;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.6)' : '#666'};
  margin-bottom: 36px;
  max-width: 520px;
  transition: color 0.4s ease;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  background: linear-gradient(135deg, #6C63FF 0%, #5a52e0 100%);
  box-shadow: 0 8px 30px rgba(108, 99, 255, 0.4);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(108, 99, 255, 0.5);
  }
`;

const SecondaryButton = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: ${p => p.$dark ? '#fff' : '#1a1a2e'};
  background: ${p => p.$dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'};
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    background: ${p => p.$dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)'};
  }
`;

const TrustBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TrustAvatars = styled.div`
  display: flex;
`;

const TrustAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
  margin-left: ${p => p.$index > 0 ? '-10px' : '0'};
  border: 2px solid #fff;
  background: ${p => {
        const colors = ['#6C63FF', '#FF6B6B', '#4ECDC4', '#FFD93D'];
        return colors[p.$index % colors.length];
    }};
`;

const TrustText = styled.p`
  font-size: 0.9rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.5)' : '#888'};
  strong { color: ${p => p.$dark ? '#fff' : '#1a1a2e'}; }
`;

// ── Hero Image ──
const HeroImageWrapper = styled.div`
  position: relative;
  animation: ${slideUp} 1s ease-out 0.2s both;
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  display: block;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
  animation: ${float} 6s ease-in-out infinite;
`;

const FloatingCard = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-radius: 16px;
  background: ${p => p.$dark ? 'rgba(30,30,60,0.85)' : 'rgba(255,255,255,0.9)'};
  backdrop-filter: blur(20px);
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  box-shadow: 0 8px 32px ${p => p.$dark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
  animation: ${floatSlow} 5s ease-in-out infinite;
  z-index: 2;
  transition: all 0.4s ease;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.$color}18;
  color: ${p => p.$color};
`;

const CardNumber = styled.p`
  font-weight: 800;
  font-size: 1.1rem;
  color: ${p => p.$dark ? '#fff' : '#1a1a2e'};
  margin: 0;
`;

const CardLabel = styled.p`
  font-size: 0.75rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.5)' : '#999'};
  margin: 0;
`;

// ── Features ──
const FeaturesSection = styled.section`
  padding: 100px 0;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const SectionLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #6C63FF;
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: ${p => p.$dark ? '#fff' : '#1a1a2e'};
  margin-bottom: 60px;
  letter-spacing: -0.5px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
`;

const FeatureCard = styled.div`
  padding: 36px 28px;
  border-radius: 20px;
  text-align: left;
  background: ${p => p.$dark ? 'rgba(30,30,60,0.6)' : 'rgba(255,255,255,0.7)'};
  backdrop-filter: blur(16px);
  border: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'};
  box-shadow: 0 4px 20px ${p => p.$dark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)'};
  transition: all 0.4s ease;
  animation: ${slideUp} 0.6s ease-out ${p => p.$delay}s both;
  cursor: default;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 40px ${p => p.$dark ? 'rgba(0,0,0,0.3)' : 'rgba(108,99,255,0.15)'};
    border-color: rgba(108, 99, 255, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: ${p => p.$color}15;
  color: ${p => p.$color};
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${p => p.$dark ? '#fff' : '#1a1a2e'};
`;

const FeatureDesc = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.55)' : '#777'};
`;

// ── CTA ──
const CTASection = styled.section`
  padding: 60px 24px 100px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
`;

const CTACard = styled.div`
  max-width: 780px;
  width: 100%;
  padding: 60px 48px;
  border-radius: 28px;
  text-align: center;
  background: linear-gradient(135deg, #6C63FF 0%, #5a52e0 60%, #4ECDC4 100%);
  box-shadow: 0 20px 60px rgba(108, 99, 255, 0.35);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const CTATitle = styled.h2`
  font-size: clamp(1.6rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  position: relative;
`;

const CTASubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 36px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
`;

const CTAButton = styled(Link)`
  text-decoration: none;
  padding: 14px 36px;
  border-radius: 14px;
  font-weight: 700;
  font-size: 1rem;
  color: #6C63FF;
  background: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  }
`;

const CTAButtonAlt = styled(Link)`
  text-decoration: none;
  padding: 14px 36px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.28);
  }
`;

// ── Footer ──
const Footer = styled.footer`
  padding: 32px 24px;
  text-align: center;
  position: relative;
  z-index: 1;
  border-top: 1px solid ${p => p.$dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'};
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: ${p => p.$dark ? 'rgba(255,255,255,0.4)' : '#aaa'};
`;
