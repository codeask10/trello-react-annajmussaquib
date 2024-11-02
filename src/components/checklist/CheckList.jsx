import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Spinner from '../Spinner';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-rounded': {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#323940',
        color: '#B6C2CF',
    },
}));


const CheckList = ({ setShowChecklist, showChecklist, selectedCard }) => {

    const [checkListData, setCheckListData] = useState([]);
    const [showAddChecklist, setShowAddChecklist] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseChecklist = () => {
        setShowChecklist(false);
    }

    return (
        <StyledDialog onClose={handleCloseChecklist} open={open}>
            {/* Dialog Title with Close Button */}
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardOutlinedIcon sx={{ marginRight: '0.5rem' }} />
                    <h3>{selectedCard.name}</h3>
                </div>
                <IconButton onClick={handleCloseChecklist} sx={{ color: '#B6C2CF' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent dividers sx={{ padding: '1rem' }}>
                {loading ? (
                    <Spinner />
                ) : (
                    checkListData.map((ele) => (
                        <div
                            key={ele.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '0.5rem',
                                borderBottom: '1px solid #505A64',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ChecklistIcon sx={{ marginRight: '0.5rem' }} />
                                <h4>{ele.name}</h4>
                            </div>
                            <Button
                                size="small"
                                variant="contained"
                                // onClick={() => onDelete(ele.id)}
                                sx={{
                                    color: '#B6C2CF',
                                    backgroundColor: '#3B444C',
                                    '&:hover': { backgroundColor: '#505A64' },
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    ))
                )}
            </DialogContent>

            {/* Dialog Actions / Footer */}
            <DialogActions sx={{ padding: '1rem' }}>
                <Button
                    variant="contained"
                    // onClick={onAdd}
                    sx={{
                        color: '#B6C2CF',
                        backgroundColor: '#3B444C',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ChecklistIcon sx={{ marginRight: '0.5rem' }} />
                    Add Checklist
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default CheckList;