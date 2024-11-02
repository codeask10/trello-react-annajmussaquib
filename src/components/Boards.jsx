import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { Key, Token } from './../config/Config';
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';

const Boards = () => {
    const [allBoards, setAllBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [newBoardName, setNewBoardName] = useState("");

    // Fetch boards on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://api.trello.com/1/members/me/boards?key=${Key}&token=${Token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                setAllBoards(data);
            } catch (error) {
                console.error('Error fetching boards:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Function to open the popover
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to close the popover
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Create new board function
    const createBoard = async () => {
        if (!newBoardName) return;
        try {
            const res = await fetch(`https://api.trello.com/1/boards/?name=${newBoardName}&key=${Key}&token=${Token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const newBoard = await res.json();
            setAllBoards((prevBoards) => [...prevBoards, newBoard]);
            setNewBoardName("");
            handleClose();
        } catch (error) {
            console.error('Error creating board:', error);
        }
    };

    return (
        <Box sx={{ p: 5, m: 'auto' }}>
            <Grid container spacing={5} sx={{ flexWrap: 'wrap', justifyContent: 'start' }}>
                {loading ? (
                    <Spinner />
                ) : (
                    allBoards.map(({ id, name }) => (
                        <Grid item xs={6} sm={4} md={3} key={id}>
                            <Link to={`/boards/${id}`} style={{ textDecoration: 'none' }}>
                                <Card sx={{ width: 200, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                    <CardContent sx={{ p: 0 }}>
                                        <Typography variant="body3" sx={{ marginLeft: 1 }}>
                                            {name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))
                )}

                {/* Create new board button */}
                <Grid item xs={6} sm={4} md={3}>
                    <Card sx={{ width: 200, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardContent sx={{ textAlign: 'center', p: 0 }}>
                            <Button size="small" onClick={handleOpen}>
                                <AddIcon />
                                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                                    Create new board
                                </Typography>
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Popover for new board creation */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2, width: 250 }}>
                    <Typography variant="h6">New Board</Typography>
                    <TextField
                        fullWidth
                        label="Board Name"
                        variant="outlined"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        sx={{ my: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={createBoard}>
                        Create
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
};

export default Boards;
