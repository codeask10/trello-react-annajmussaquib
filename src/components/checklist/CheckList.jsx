import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';


import Spinner from '../Spinner';
import { getCheckList, deleteCheckListById } from '../../TrelloApi';
import AddCheckList from './AddCheckList';
import CheckListItems from '../checklistitems/CheckListItems';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-rounded': {
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#323940',
        color: '#B6C2CF',
    },
}));


const CheckList = ({ setShowChecklist, showChecklist, selectedCard }) => {

    const [checkListData, setCheckListData] = useState([]);
    const [showAddChecklist, setShowAddChecklist] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchChecklist = async () => {
        setLoading(true)
        try {
            const res = await getCheckList(selectedCard[0]);
            const data = await res.data;
            setCheckListData(data)
        } catch (err) {
            toast.error("Internal Server Error", err);
            navigate("/error-page");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchChecklist()
    }, [selectedCard[0]])

    const handleDeleteCheckList = async (cardId, checkListId) => {
        try {
            await deleteCheckListById(cardId, checkListId);
            setCheckListData(checkListData.filter(Checklist => Checklist.id !== checkListId));
            toast.success("Added Checklist Successfully");
        } catch (err) {
            toast.error("Internal Server Error", err);
            navigate("/error-page");
        }
    }
    const handleCloseChecklist = () => {
        setShowChecklist(false);
    }

    return (
        <StyledDialog onClose={handleCloseChecklist} open={showChecklist}>
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                        <CreditCardOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                        <Typography variant="h6">{selectedCard[1]}</Typography>
                    </Box>
                    <IconButton onClick={handleCloseChecklist} sx={{ color: '#B6C2CF' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ padding: '1rem', display: "flex", justifyContent: "space-between" }}>
                {loading ? (
                    <Spinner color="inherit" />

                ) : (
                    <Box padding="10px" display="flex" flexDirection="column" gap="1rem" width="55%">
                        {checkListData.map((ele) => (
                            <Box
                                key={ele.id}
                                display="flex"
                                flexDirection="column"
                                sx={{ paddingBottom: '0.5rem', borderBottom: '1px solid #505A64' }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        <ChecklistIcon sx={{ marginRight: '0.5rem' }} />
                                        <Typography variant="body1">{ele.name}</Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        sx={{ color: '#B6C2CF' }}
                                        onClick={() => handleDeleteCheckList(selectedCard[0], ele.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                                <CheckListItems selectedCardId={selectedCard[0]} checkListId={ele.id} />
                            </Box>
                        ))}
                    </Box>
                )}

                <DialogActions sx={{ padding: '1rem', alignItems: "flex-start" }}>
                    {showAddChecklist ? (
                        <AddCheckList
                            setShowAddChecklist={setShowAddChecklist}
                            checkListData={checkListData}
                            setCheckListData={setCheckListData}
                            selectedCardId={selectedCard[0]}
                        />
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                color: '#B6C2CF',
                                backgroundColor: '#3B444C',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => setShowAddChecklist(true)}
                        >
                            <ChecklistIcon sx={{ marginRight: '0.5rem' }} />
                            Add Checklist
                        </Button>
                    )}
                </DialogActions>
            </DialogContent>
        </StyledDialog>
    )
}

export default CheckList;