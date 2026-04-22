import { Container, Grid, Paper, Box, Typography } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import {
    Groups as StudentsIcon,
    Class as ClassesIcon,
    Person as TeachersIcon,
    AccountBalanceWallet as FeesIcon,
} from '@mui/icons-material';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    const statCards = [
        {
            title: 'Total Students',
            value: numberOfStudents,
            icon: <StudentsIcon sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #6C63FF 0%, #5a52e0 100%)',
            shadowColor: 'rgba(108,99,255,0.3)',
        },
        {
            title: 'Total Classes',
            value: numberOfClasses,
            icon: <ClassesIcon sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #FF6B6B 0%, #e55a5a 100%)',
            shadowColor: 'rgba(255,107,107,0.3)',
        },
        {
            title: 'Total Teachers',
            value: numberOfTeachers,
            icon: <TeachersIcon sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #4ECDC4 0%, #3dbdb5 100%)',
            shadowColor: 'rgba(78,205,196,0.3)',
        },
        {
            title: 'Fees Collection',
            value: 23000,
            prefix: '$',
            icon: <FeesIcon sx={{ fontSize: 32 }} />,
            gradient: 'linear-gradient(135deg, #FFD93D 0%, #f0c830 100%)',
            shadowColor: 'rgba(255,217,61,0.3)',
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    fontWeight: 700,
                    color: 'text.primary',
                }}
            >
                Welcome back, {currentUser.name} 👋
            </Typography>
            <Grid container spacing={3}>
                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 180,
                                justifyContent: 'space-between',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: `0 12px 30px ${card.shadowColor}`,
                                },
                            }}
                        >
                            {/* Background decoration */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -20,
                                    right: -20,
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    background: card.gradient,
                                    opacity: 0.1,
                                }}
                            />
                            {/* Icon */}
                            <Box
                                sx={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: card.gradient,
                                    color: '#fff',
                                    boxShadow: `0 4px 12px ${card.shadowColor}`,
                                }}
                            >
                                {card.icon}
                            </Box>
                            {/* Content */}
                            <Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        mb: 0.5,
                                    }}
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 800,
                                        color: 'text.primary',
                                        letterSpacing: '-0.5px',
                                    }}
                                >
                                    <CountUp
                                        start={0}
                                        end={card.value}
                                        duration={2.5}
                                        prefix={card.prefix || ''}
                                    />
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}

                {/* Notices Section */}
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminHomePage