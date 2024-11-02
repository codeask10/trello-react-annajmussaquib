import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Image from "./../assets/Trello.png";
import { Link } from 'react-router-dom';

const Appbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ bgcolor: '#3f51b5' }}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginLeft: 'auto' }}>Boards</Link>
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <img src={Image} alt="Trello Icon" style={{ width: '30px', height: '30px', marginRight: '2px' }} />
                            Trello
                        </IconButton>
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Appbar;
