import React from 'react';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, Button, Container } from '@mui/material';

const ErrorPage = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <Box>
                <ErrorOutlineIcon
                    sx={{
                        fontSize: '8rem',
                        color: 'error.main',
                        mb: 2,
                    }}
                />
                <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Something Went Wrong
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    We’re sorry, but the page you were looking for could not be found. Please check the URL or try again later.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    sx={{
                        color: 'white',
                        mt: 3,
                        px: 4,
                        py: 1,
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    }}
                >
                    Go Back Home
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPage;
