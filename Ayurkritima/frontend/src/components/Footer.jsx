import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const { palette } = useTheme();
    return (
        <Box sx={{
            height: '70px',
            bgcolor: "#10170B",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 9999 // Ensure it's above other content
        }}>
            <Box component='span' sx={{ color:'white' }}>All rights reserved 2023.</Box>
        </Box>
    );
};

export default Footer;
