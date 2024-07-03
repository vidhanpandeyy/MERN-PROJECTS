import { React } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchInputEl = () => {
    const { isAuthenticated, userInfo } = useSelector(state => state.signIn);
    const navigate = useNavigate();

    const onSubmit = () => {
            navigate('/prompt');
    };

    return (
        <Box
            sx={{
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent', // Set the background to transparent
                textAlign: 'center',
                color: 'white', // Text color
            }}
        >
            <Typography variant="h4" gutterBottom>
                Transforming Healthcare
            </Typography>
            <Typography variant="subtitle1">
                AyurKritima AI
            </Typography>
            <Button
                variant="contained"
                onClick={onSubmit}
                sx={{ backgroundColor: '#566822', color: 'white', mt: 2 }} // Light Green color
            >
                Get Prescription
            </Button>
        </Box>
    );
};

export default SearchInputEl;
