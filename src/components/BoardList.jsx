import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { getAllLists, createList, deleteListById } from '../TrelloApi.jsx'
import ListForm from './ListForm.jsx';
import Cards from './Cards.jsx';
import Spinner from './Spinner.jsx';

const BoardList = () => {
    const [loading, setLoading] = useState(false);
    const [listsData, setListsData] = useState([]);
    const [showListForm, setShowListForm] = useState(false);
    const id = useParams().id
    const navigate = useNavigate();

    const fetchAllListData = async () => {
        setLoading(true)
        try {
            const res = await getAllLists(id)
            const data = await res.data
            setListsData(data);
        } catch (err) {
            toast.error("Internal Error", err);
            navigate("/error-page");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllListData()
    }, [])

    const handleCreateList = async (name) => {
        try {
            const res = await createList(id, name);
            setListsData([...listsData, res.data]);
            setShowListForm(false);
            toast.success("Created List Successfully");
        } catch (err) {
            toast.error("Internal Server Error", err);
            navigate("/error-page");
        }
    }
    const handleDeleteList = async (listId) => {
        try {
            await deleteListById(listId);
            setListsData(listsData.filter(ele => ele.id !== listId));
            toast.success("Deleted List Successfully");
        } catch (error) {
            toast.error("Internal Server Error", error);
            navigate("/error-page");
        }
    }

    const handleCancelList = () => {
        setShowListForm(false)
    }

    return (
        <>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        width: '90%',
                        py: 2,
                        px: 1,
                        scrollbarWidth: 'none', // Hides scrollbar in Firefox
                        '&::-webkit-scrollbar': {
                            display: 'none',  // Hides scrollbar in Chrome, Safari, and Edge
                        },
                    }}
                >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 5 }}>
                            <Spinner />
                        </Box>
                    ) : (
                        <>
                            {listsData.map((list) => (
                                <Paper
                                    key={list.id}
                                    elevation={3}
                                    sx={{
                                        width: "300px",
                                        m: 1,
                                        p: 2,
                                        backgroundColor: '#101204',
                                        color: 'white',
                                        flexShrink: 0,
                                        height: 'fit-content'
                                    }}
                                >
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5">{list.name}</Typography>
                                        <IconButton onClick={() => handleDeleteList(list.id)} sx={{ color: '#B4C0CD' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                    <Cards listId={list.id} />

                                </Paper>
                            ))}

                            {showListForm ? (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        minWidth: '250px',
                                        maxWidth: '300px',
                                        height: "fit-content",
                                        m: 1,
                                        p: 2,
                                        backgroundColor: '#101204',
                                        color: '#B4C0CD',
                                        flexShrink: 0,
                                    }}
                                >
                                    <ListForm handleAddTo={handleCreateList} handleCancel={handleCancelList} />
                                </Paper>
                            ) : (
                                <Paper
                                    elevation={3}
                                    sx={{
                                        minWidth: '250px',
                                        maxWidth: '300px',
                                        height: "fit-content",
                                        m: 1,
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        backgroundColor: "rgb(0 0 0 / 50%)",
                                        color: '#B4C0CD',
                                        '&:hover': { boxShadow: '0 0 0 1px #85B8FF' },
                                        flexShrink: 0,
                                    }}
                                    onClick={() => setShowListForm(true)}
                                >
                                    <AddIcon sx={{ mr: 1 }} />
                                    <Typography variant="h6">Add another list</Typography>
                                </Paper>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default BoardList