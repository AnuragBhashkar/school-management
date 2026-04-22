import { createTheme } from '@mui/material/styles';

// Shared theme factory matching the landing page's design system
export const getDesignTheme = (darkMode) => createTheme({
    palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
            main: '#6C63FF',
            light: '#8B83FF',
            dark: '#5a52e0',
        },
        secondary: {
            main: '#FF6B6B',
            light: '#FF8A8A',
            dark: '#e55a5a',
        },
        success: {
            main: '#4ECDC4',
        },
        warning: {
            main: '#FFD93D',
        },
        background: {
            default: darkMode ? '#0f0c29' : '#f5f3fa',
            paper: darkMode ? '#1a1a3e' : '#ffffff',
        },
        text: {
            primary: darkMode ? '#ffffff' : '#1a1a2e',
            secondary: darkMode ? 'rgba(255,255,255,0.6)' : '#666666',
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h6: {
            fontWeight: 700,
            letterSpacing: '-0.3px',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: darkMode
                        ? 'linear-gradient(135deg, #1a1a3e 0%, #2c2c6c 100%)'
                        : 'linear-gradient(135deg, #6C63FF 0%, #5a52e0 100%)',
                    boxShadow: darkMode
                        ? '0 4px 20px rgba(0,0,0,0.4)'
                        : '0 4px 20px rgba(108,99,255,0.3)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: darkMode
                        ? 'linear-gradient(180deg, #1a1a3e 0%, #0f0c29 100%)'
                        : 'linear-gradient(180deg, #ffffff 0%, #f5f3fa 100%)',
                    borderRight: darkMode
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(108,99,255,0.08)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    borderRadius: 16,
                    border: darkMode
                        ? '1px solid rgba(255,255,255,0.06)'
                        : '1px solid rgba(108,99,255,0.06)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    margin: '2px 8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        background: darkMode
                            ? 'rgba(108,99,255,0.15)'
                            : 'rgba(108,99,255,0.08)',
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    background: darkMode
                        ? 'linear-gradient(135deg, #1a1a3e 0%, #2c2c6c 100%)'
                        : 'linear-gradient(135deg, #6C63FF 0%, #5a52e0 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                },
            },
        },
    },
});
